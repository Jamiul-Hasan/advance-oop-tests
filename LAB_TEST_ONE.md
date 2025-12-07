# Lab Test One — Full-Stack CRUD Application

This project contains a minimal example implementing the requirements for the lab test.

Structure
- `backend/` — Spring Boot REST API (runs on port 8080)
- `frontend/` — Vite React TypeScript app (runs on port 5173)
- `.devcontainer/` — Codespaces/devcontainer configuration

Run locally (in Codespaces or developer machine)

1. Start backend:

```bash
cd backend
mvn spring-boot:run
```

2. Start frontend:

```bash
cd frontend
npm run dev
```

The frontend interacts with the backend at `http://localhost:8080/api/items`.

Notes
- Backend uses an in-memory store (no DB) so data is lost after restart.
- CORS is enabled for development via `@CrossOrigin`. Adjust for production.
