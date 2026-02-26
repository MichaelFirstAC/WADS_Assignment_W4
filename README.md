# API Assignment Submission

## Repository Link

- Replace with your repository URL: `https://github.com/<username>/<repo-name>`

## Screenshot - Next.js Structure

- Add screenshot file and update the path below.

![Next.js Structure Screenshot](documentation/screenshots/next-structure.png)

## List of APIs

| Method | Endpoint | Description | Request Body (JSON) |
|---|---|---|---|
| GET | `/api/users` | Get all users | - |
| POST | `/api/users` | Create a new user | `{ "name": "John Doe", "email": "john@example.com", "role": "user" }` |
| GET | `/api/users/{id}` | Get one user by ID | - |
| PUT | `/api/users/{id}` | Update user by ID | `{ "name": "Updated Name", "email": "updated@example.com", "role": "admin" }` |
| DELETE | `/api/users/{id}` | Delete user by ID | - |

## Screenshot - /api/docs Route

- Add screenshot file and update the path below.

![Swagger Docs Screenshot](documentation/screenshots/api-docs.png)

## Swagger / OpenAPI Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/docs` | Interactive Swagger UI |
| GET | `/api/docs/openapi` | OpenAPI JSON specification |

## Run Locally

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000/api/docs`
