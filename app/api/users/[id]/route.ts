import { NextResponse } from "next/server";

import { deleteUser, getUserById, updateUser } from "@/lib/api/users-service";
import type { UpdateUserInput } from "@/lib/api/users-types";

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get one user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *   put:
 *     summary: Update user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: User not found
 *   delete:
 *     summary: Delete user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;
  const user = getUserById(id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ data: user });
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;

  let body: UpdateUserInput;

  try {
    body = (await request.json()) as UpdateUserInput;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 },
    );
  }

  const hasAnyUpdate =
    body.name !== undefined || body.email !== undefined || body.role !== undefined;

  if (!hasAnyUpdate) {
    return NextResponse.json(
      { error: "At least one field (name, email, role) is required" },
      { status: 400 },
    );
  }

  const user = updateUser(id, body);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ data: user });
}

export async function DELETE(_: Request, context: RouteContext) {
  const { id } = await context.params;
  const deleted = deleteUser(id);

  if (!deleted) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "User deleted", data: deleted });
}
