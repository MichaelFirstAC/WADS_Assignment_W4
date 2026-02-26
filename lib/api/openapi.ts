export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "My App User API",
    version: "1.0.0",
    description:
      "Dummy in-memory API for assignment purposes. No database connection is used.",
  },
  servers: [{ url: "http://localhost:3000" }],
  tags: [{ name: "Users", description: "User CRUD operations" }],
  paths: {
    "/api/users": {
      get: {
        tags: ["Users"],
        summary: "Get all users",
        responses: {
          "200": {
            description: "List of users",
          },
        },
      },
      post: {
        tags: ["Users"],
        summary: "Create user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email"],
                properties: {
                  name: { type: "string", example: "John Doe" },
                  email: { type: "string", example: "john@example.com" },
                  role: {
                    type: "string",
                    enum: ["admin", "user"],
                    example: "user",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "User created" },
          "400": { description: "Validation error" },
        },
      },
    },
    "/api/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get one user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "User details" },
          "404": { description: "User not found" },
        },
      },
      put: {
        tags: ["Users"],
        summary: "Update user",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Updated Name" },
                  email: { type: "string", example: "updated@example.com" },
                  role: { type: "string", enum: ["admin", "user"] },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "User updated" },
          "400": { description: "Validation error" },
          "404": { description: "User not found" },
        },
      },
      delete: {
        tags: ["Users"],
        summary: "Delete user",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "User deleted" },
          "404": { description: "User not found" },
        },
      },
    },
  },
};
