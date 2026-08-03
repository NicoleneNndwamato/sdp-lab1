# Running It

## Requirements

- **Node.js version:** 20.x (LTS)
- **Package manager:** npm

## 1. Clone and install

```bash
git clone <repository-url>
cd sdp-lab1
npm install
```

## 2. Configure environment variables

Create a file named `.env` in the project root (same level as `package.json`) with the following content:

```
DB_FILE_NAME=local.db
```

This tells the app, and the database tooling, where to create and read the local SQLite database file.

## 3. Set up the database

Apply the database schema by running the migrations:

```bash
npx drizzle-kit migrate
```

This creates `local.db` in the project root (if it doesn't already exist) and applies the `tasks` table schema to it.

## 4. Run the application

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in a browser.

The app can be stopped at any time with `Ctrl+C` in the terminal. Restarting it with `npm run dev` again will not lose any data — all tasks are persisted in `local.db` on disk.

## 5. Run the tests

```bash
npm test
```

This runs the full test suite via Jest. Tests use an in-memory SQLite database created fresh for each test file, so they do not read from or write to `local.db`, and are safe to run at any time without affecting the application's real data.

## 6. Build for production (optional)

```bash
npm run build
npm run start
```

`build` compiles an optimized production version of the app; `start` runs that compiled version. This is not required for local development, where `npm run dev` is sufficient.

## Summary of commands

| Command | Purpose |
|---|---|
| `npm install` | Install all dependencies |
| `npx drizzle-kit migrate` | Create/update the SQLite database schema |
| `npm run dev` | Start the app in development mode |
| `npm test` | Run the test suite |
| `npm run build` | Build an optimized production bundle |
| `npm run start` | Run the production build |
