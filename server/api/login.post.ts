import { object, parse, required, string } from "valibot";
import { scrypt, randomBytes } from "node:crypto";
import { Argon2id } from "oslo/password";
export default defineEventHandler(async (event) => {
  const { username, password } = await readValidatedBody(event, (body) =>
    parse(
      required(
        object({
          username: string(),
          password: string(),
        }),
      ),
      body,
    ),
  );
  const existingUser = await useDB()
    .db("ratings")
    .collection<{ password: string }>("users")
    .findOne({ username });
  if (!existingUser) {
    return createError({
      message: "Invalid username or password",
      status: 401,
    });
  }
  const verifiedPassword = await new Argon2id().verify(
    existingUser.password,
    password,
  );
  if (!verifiedPassword) {
    return createError({
      message: "Invalid username or password",
      status: 401,
    });
  }
  const lucia = useLucia()
  const session = await lucia.createSession(existingUser._id.toString(), {});
	appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
});
