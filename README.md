# Wanderly

Wanderly is a full-stack travel planning web application built around Indian destinations. It lets users discover places, build trip itineraries, track visited destinations, leave reviews, and manage a personal travel profile. The design language draws from high-end travel journalism — warm earth tones, editorial typography, and a layout that feels closer to a curated magazine than a typical web app.

Live demo - https://wanderly-gilt.vercel.app

---


## What it does

- Browse a curated list of Indian destinations with details, photos, and attractions
- Search and filter destinations by name, state, or category
- Create personal itineraries with day-by-day activities
- Mark destinations as visited or save them to favorites
- Leave reviews on destinations
- Sign up and log in with email/password or Google OAuth
- View a profile page with travel stats, achievements, and a passport-style card showing visited places

---

## Tech Stack

### Frontend

| Tool | Purpose |
|------|---------|
| React 19 | UI framework |
| React Router v7 | Client-side routing |
| Vite 7 | Dev server and build tool |
| Tailwind CSS v4 | Utility-first styling |
| GSAP + @gsap/react | Animations |
| Three.js | 3D globe component |
| Lucide React + React Icons | Icon libraries |
| React Datepicker | Date selection in itinerary forms |
| @react-oauth/google | Google Sign-In integration |
| split-type | Text splitting for animation effects |

### Backend

| Tool | Purpose |
|------|---------|
| Node.js + Express 5 | HTTP server and routing |
| PostgreSQL + pg | Relational database |
| node-pg-migrate | Database migrations |
| JSON Web Tokens (JWT) | Session management via HTTP-only cookies |
| bcrypt | Password hashing |
| google-auth-library | Google OAuth token verification |
| express-validator + validator | Input validation |
| dotenv | Environment variable management |
| cors | Cross-origin request handling |

---

## Project Structure

```
Ghumi-Ghumi/
├── frontend/               # React application (Vite)
│   ├── src/
│   │   ├── api/            # Axios API call functions
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # AuthContext for global auth state
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Route-level page components
│   │   ├── App.jsx         # Root component with routing
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   └── vite.config.js      # Vite config with proxy to backend
│
└── backend/                # Express API server
    ├── config/             # Database pool and cookie config
    ├── controllers/        # Request handlers
    ├── services/           # Business logic
    ├── repositories/       # Database query functions
    ├── routes/             # Express routers
    ├── middlewares/        # Auth guard, error handler, validator runner
    ├── validators/         # express-validator rule sets
    ├── migrations/         # node-pg-migrate migration files
    ├── utils/              # JWT helpers, async wrapper, API response shape
    ├── errors/             # Custom AppError class
    └── server.js           # App entry point
```

---

## API Overview

All routes are prefixed with `/api`.

| Prefix | Description | Auth Required |
|--------|-------------|---------------|
| `/api/auth` | Signup, login, Google login | No |
| `/api/user` | Get current user info | Yes |
| `/api/destinations` | List and get destinations | Optional |
| `/api/destinations/:id/reviews` | Post a review | Yes |
| `/api/itineraries` | CRUD itineraries and activities | Yes |
| `/api/favorites` | Save or remove favorite destinations | Yes |
| `/api/visited` | Mark destinations as visited | Yes |
| `/api/profile` | Get profile data | Yes |

Authentication uses HTTP-only cookies containing a JWT. The `requireLogin` middleware verifies the token on protected routes. The `optionalLogin` middleware attaches user info if a valid token exists, but does not block unauthenticated requests.

---

## Database Schema

The database is managed through sequential migration files using `node-pg-migrate`. The schema includes the following tables:

- **users** — stores account credentials, name, email, and optional Google auth fields
- **destinations** — curated destination records with state, description, icons, and category data
- **attractions** — points of interest linked to destinations
- **itineraries** — user-created trip plans with title, dates, and destination
- **activities** — individual items within an itinerary, ordered by position
- **reviews** — user ratings and comments on destinations
- **favorite_destinations** — many-to-many link between users and saved destinations
- **visited_destinations** — many-to-many link between users and places they have been to

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- PostgreSQL running locally

### 1. Clone the repository

```bash
git clone https://github.com/shresthkohli/Ghumi-Ghumi.git
cd Ghumi-Ghumi
```

### 2. Set up the backend

```bash
cd backend
npm install
```
You must have installed postgreSQL and have an empty database.
Create a `.env` file in the `backend/` directory with the following variables:

```diff
PORT=3000
+ DATABASE_URL=YOUR_DATABASE_URL

DB_HOST=localhost
DB_PORT=5432
+ DB_NAME=YOUR_DATABASE_NAME
DB_USER=postgres
+ DB_PASSWORD=YOUR_DB_PASSWORD

JWT_SECRET=MeethiRasmalai
JWT_EXPIRES_IN=7d

GOOGLE_PROJECT_NAME = Ghumi-Ghumi
GOOGLE_PROJECT_ID = ghumi-ghumi-web-wonders

GOOGLE_CLIENT_ID=695353789298-2maj1kv2b2termlajvdlf12tmpirfmdl.apps.googleusercontent.com
```

Run database migrations to set up the schema:

```bash
npm run migrate
```

Start the backend server:

```bash
npm start
```

The server will run on `http://localhost:3000`.

### 3. Set up the frontend

```bash
cd ../frontend
npm install
npm run dev
```

The frontend dev server will start on `http://localhost:5173`. API requests are automatically proxied to the backend at `localhost:3000` via the Vite config.

---

## Frontend Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` or `/discover` | Discover | Landing page with featured journeys, globe, and highlights |
| `/destinations` | Destinations | Filterable grid of all destinations |
| `/destinations/:id` | Destination Details | Full page for a single destination with attractions, reviews, and booking widget |
| `/itineraries` | Itineraries | User's saved itineraries with activity timelines |
| `/profile` | Profile | Travel stats, passport card, achievements, and visited map |
| `/login` | Login | Email/password and Google login |
| `/signup` | Signup | New account registration |

---

## Design System

The visual design is defined in `DESIGN.md`. The palette uses warm earth tones — cream backgrounds, terracotta as the primary action color, sage green and ocean teal for secondary elements. Typography pairs **Playfair Display** for editorial headings with **Inter** for body text and UI labels. The layout mimics a printed travel magazine: generous whitespace, overlapping elements, pill-shaped buttons, and soft-radius cards.

---

## Development Notes

- The frontend proxies all `/api` requests to `localhost:3000`, so you do not need to configure CORS or base URLs separately during development.
- The backend uses ES Modules throughout (`"type": "module"` in `package.json`).
- Migrations are run with `npm run migrate` and rolled back with `npm run migrate:down`. New migration files can be generated with `npm run migrate:create`.
- Cookies are set as `httpOnly` and `sameSite: lax`. In production, `secure: true` is applied automatically based on `NODE_ENV`.
