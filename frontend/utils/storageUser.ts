import { usersTokensSchema } from "@api/schemas";
import { z, ZodError } from "zod";

export const localUserSchema = usersTokensSchema.merge(
  z.object({
    name: z.string(),
  })
);
type localUser = z.infer<typeof localUserSchema>;

type localUserStorage = {
  error: boolean;
  user?: localUser;
  message?: string;
};

export function saveUserToStorage(user: localUser): localUserStorage {
  if (typeof window === "undefined") {
    return { error: true, message: "No local storage" };
  }
  try {
    localUserSchema.parse(user);
    localStorage.setItem("user", JSON.stringify(user));
    return { error: false, user };
  } catch (e) {
    const err = e as ZodError;
    return { error: true, message: err.message };
  }
}

export function loadUserFromStorage(): localUserStorage {
  if (typeof window === "undefined") {
    return { error: true, message: "No local storage" };
  }
  const user = localStorage.getItem("user");
  if (!user) {
    return { error: true, message: "No user in storage" };
  }
  try {
    const parsedUser = JSON.parse(user);
    localUserSchema.parse(parsedUser);
    return { error: false, user: parsedUser };
  } catch (e) {
    const err = e as ZodError;
    return { error: true, message: err.message };
  }
}
