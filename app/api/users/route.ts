import { NextResponse } from "next/server";

import { createUser, listUsers } from "@/lib/api/users-service";
import type { CreateUserInput } from "@/lib/api/users-types";

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation error
 */

export async function GET() {
  const users = listUsers();

  return NextResponse.json({
    data: users,
    count: users.length,
  });
}

export async function POST(request: Request) {
  let body: Partial<CreateUserInput>;

  try {
    body = (await request.json()) as Partial<CreateUserInput>;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 },
    );
  }

  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: "name and email are required" },
      { status: 400 },
    );
  }

  const user = createUser({
    name: body.name,
    email: body.email,
    role: body.role,
  });

  return NextResponse.json({ data: user }, { status: 201 });
}
