# Civic Route Monorepo

Citizen complaint routing for local government councils.

## Layout

```
frontend/
    src/               # React + Vite app
    index.html
    vite.config.js
    package.json
    .env.example

backend/
    app/main.py        # FastAPI service
    requirements.txt
```

## Frontend

The frontend is the current Vite app, moved into `frontend/`.

```bash
npm install
npm run dev
```

That starts the frontend on `http://localhost:5173`.

## Backend

The backend folder now contains a minimal FastAPI service that matches the current frontend contract.

```bash
python -m pip install -r backend/requirements.txt
npm run backend:dev
```

That starts the API on `http://localhost:8000`.

## Current API contract

- `POST /api/complaints/submit`
- `GET /api/complaints/local-government/{lgc_id}`
- `PATCH /api/complaints/{id}/status`

## Notes

- Frontend mock mode still defaults to on through `frontend/.env.example`.
- The Vite proxy in `frontend/vite.config.js` forwards `/api` calls to the backend during local development.
- Run the frontend and backend in separate terminals if you want both up at once.
