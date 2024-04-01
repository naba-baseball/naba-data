import type { User } from "lucia";

export const useUser = () => {
	const user = useState<User | null>("user", () => ref(null));
	return user;
};