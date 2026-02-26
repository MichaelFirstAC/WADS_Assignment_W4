import type { User } from "./users-types";

export const usersStore: User[] = [
  {
    id: "u_001",
    name: "Alicia Stone",
    email: "alicia@example.com",
    role: "admin",
    createdAt: "2026-02-26T09:00:00.000Z",
    updatedAt: "2026-02-26T09:00:00.000Z",
  },
  {
    id: "u_002",
    name: "Ben Carter",
    email: "ben@example.com",
    role: "user",
    createdAt: "2026-02-26T09:10:00.000Z",
    updatedAt: "2026-02-26T09:10:00.000Z",
  },
];

let nextId = 3;

export function generateUserId(): string {
  const id = `u_${String(nextId).padStart(3, "0")}`;
  nextId += 1;
  return id;
}
