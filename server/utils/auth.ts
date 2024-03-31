import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import type { Collection } from "mongodb";
import type { EventHandler, EventHandlerRequest } from "h3";
import type { AuthRole } from "~/types/auth.js";

export const authenticatedEventHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
  role?: AuthRole,
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      const sessionId = getCookie(event, "auth_session");
      if (!sessionId) return createError({ message: "no sess", status: 401 });
      const { session, user } = await useLucia().validateSession(sessionId);
      event.context.user = user;
      event.context.session = session;
      if (!user) return createError({ message: "no user", status: 401 });
      if (!session) return createError({ message: "no sess", status: 401 });
      if (role) {
        if (user?.role !== role)
          return createError({ message: "Unauthorized", status: 401 });
      }

      const response = await handler(event);
      return { response };
    } catch (err) {
      // Error handling
      return { err };
    }
  });

export const useLucia = () => {
  const db = useDB().db("ratings");

  const User = db.collection("users") as Collection<UserDoc>;
  const Session = db.collection("sessions") as Collection<SessionDoc>;
  const adapter = new MongodbAdapter(Session, User);

  return new Lucia(adapter, {
    sessionCookie: {
      attributes: {
        secure: !import.meta.dev,
      },
    },
    getUserAttributes: (attributes) => {
      return {
        // attributes has the type of DatabaseUserAttributes
        username: attributes.username,
        role: attributes.role,
      };
    },
  });
};

interface UserDoc {
  _id: string;
  username: string;
  role: "admin" | string;
}

interface SessionDoc {
  _id: string;
  expires_at: Date;
  user_id: string;
}

declare module "lucia" {
  interface Register {
    Lucia: ReturnType<typeof useLucia>;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
  role: AuthRole;
}
