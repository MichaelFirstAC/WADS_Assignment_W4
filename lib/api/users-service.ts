import { generateUserId, usersStore } from "./users-store";
import type { CreateUserInput, UpdateUserInput, User } from "./users-types";

export function listUsers(): User[] {
  return usersStore;
}

export function getUserById(id: string): User | undefined {
  return usersStore.find((user) => user.id === id);
}

export function createUser(payload: CreateUserInput): User {
  const now = new Date().toISOString();

  const user: User = {
    id: generateUserId(),
    name: payload.name,
    email: payload.email,
    role: payload.role ?? "user",
    createdAt: now,
    updatedAt: now,
  };

  usersStore.push(user);
  return user;
}

export function updateUser(id: string, payload: UpdateUserInput): User | undefined {
  const index = usersStore.findIndex((user) => user.id === id);
  if (index === -1) return undefined;

  const current = usersStore[index];
  const updated: User = {
    ...current,
    ...payload,
    updatedAt: new Date().toISOString(),
  };

  usersStore[index] = updated;
  return updated;
}

export function deleteUser(id: string): User | undefined {
  const index = usersStore.findIndex((user) => user.id === id);
  if (index === -1) return undefined;

  const [removed] = usersStore.splice(index, 1);
  return removed;
}
