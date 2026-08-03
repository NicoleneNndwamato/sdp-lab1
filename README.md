# SDP Lab 1 — Todo App

A local-first todo application built with Next.js and SQLite. There are no user accounts — the app is designed to be downloaded and run locally by a single user via Node.js.

## Features

- Create, edit, and archive tasks (tasks are never deleted)
- Each task has a Title, Description, Due Date, and Topic
- View tasks in a list, sortable by topic, status, or due date
- Fixed task statuses: Todo, In-Progress, Complete
- Overdue tasks are visibly flagged (calculated automatically, not stored)
- All data persists locally between restarts

## Requirements

- Node.js 20.x (LTS)
- npm

## Quick Start

```bash
git clone <repository-url>
cd sdp-lab1
npm install
```

Create a `.env` file in the project root with:

```
DB_FILE_NAME=local.db
```

Set up the database:

```bash
npx drizzle-kit migrate
```

Run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Run the tests:

```bash
npm test
```

Full setup, run, and test instructions: see [`docs/running-it.md`](./docs/running-it.md).

## Documentation

- [`docs/third-party-code.md`](./docs/third-party-code.md) — libraries used and why
- [`docs/database-design.md`](./docs/database-design.md) — database schema and design decisions
- [`docs/running-it.md`](./docs/running-it.md) — full install, run, and test instructions

## Tech Stack

Next.js (App Router) · TypeScript · Drizzle ORM · SQLite (via `better-sqlite3`) · Tailwind CSS · Jest

## AI Usage

Transcripts of AI usage during planning, code generation, and debugging are included in this submission, per the lab requirements.