# RightCollege4You

Full-stack college consulting website built with React, Tailwind CSS, and Express.

## Run locally

```bash
npm install
npm --prefix client install
npm --prefix server install
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000/api`

## Optional server env

Create `server/.env`:

```bash
ADMIN_TOKEN=rightcollege-admin
PORT=5000
```

Visit `/admin` and sign in with the admin token to add or edit success stories.
