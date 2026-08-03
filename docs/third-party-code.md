# Third-Party Code

This document lists every third-party library or package installed in this project, and the reason it was chosen.

## Dependencies

| Package | Reason |
|---|---|
| `next` | Framework specified by the lab brief. Used with the App Router. |
| `react`, `react-dom` | Required peer dependencies of Next.js for building the UI. |
| `drizzle-orm` | Typed SQL query builder for SQLite. Chosen over Prisma for its lighter weight and closer-to-SQL API, and because its schema file doubles as clear, readable documentation of the database structure. |
| `drizzle-kit` | Companion CLI to Drizzle ORM. Generates SQL migration files from the schema and applies them to the SQLite database, giving the project a real, reviewable migration history. |
| `better-sqlite3` | Synchronous SQLite driver for Node.js. Used as the underlying driver for Drizzle. Synchronous access is appropriate here since all database calls happen inside server-only code (Server Actions and Server Components). |
| `dotenv` | Loads environment variables from `.env` for tooling that runs outside the Next.js runtime, specifically `drizzle-kit`, which does not load `.env` automatically the way Next.js does. |
| `tailwindcss`, `@tailwindcss/postcss` | Utility-first CSS framework used for styling. Chosen to avoid hand-maintaining a growing custom stylesheet as the UI expanded. |

## Dev Dependencies

| Package | Reason |
|---|---|
| `typescript` | Required for writing and type-checking the application in TypeScript, per project constraints. |
| `jest` | Test runner used to write and run the project's unit tests. |
| `ts-jest` | Allows Jest to run TypeScript test files directly without a separate build step. |
| `@types/jest` | Provides TypeScript type definitions for Jest's global test functions (`describe`, `it`, `expect`). |
| `@types/node` | TypeScript type definitions for Node.js built-in APIs. |
| `@types/better-sqlite3` | TypeScript type definitions for the `better-sqlite3` driver. |
| `@types/react`, `@types/react-dom` | TypeScript type definitions for React, required for a typed Next.js project. |
| `eslint`, `eslint-config-next` | Linting, to enforce code quality and catch common errors, following Next.js's recommended configuration. |

## Notably not used

- **No client-side data-fetching library** (e.g. SWR, React Query, Axios). Next.js Server Actions and Server Components handle all data flow natively for this local-first, single-user application, making a separate fetching library unnecessary.
- **No validation library** (e.g. Zod). Given the small, fixed set of form fields and the local-first, single-user scope of the app, native HTML form validation (`required`, `type="date"`) was judged sufficient without adding an extra dependency.
- **No state-management library** (e.g. Redux, Zustand). The application's state is entirely server-derived (from SQLite) and re-fetched via `revalidatePath` after each mutation, so no client-side global state store is needed.
