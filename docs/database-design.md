# Database Design

## Overview

The application uses a single SQLite database file, managed through Drizzle ORM. The schema consists of one table: `tasks`. There are no relationships between tables, as a single table is sufficient to model the application's requirements.

## Table: `tasks`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | integer | Primary key, auto-increment | Unique identifier for the task. |
| `title` | text | Not null | The task's title. |
| `description` | text | Nullable | An optional longer description of the task. |
| `topic` | text | Not null | The topic/category the task belongs to. Required so the list can always be sorted by topic. |
| `due_date` | integer (Unix timestamp) | Not null | The task's due date, stored as a timestamp rather than a text string, so that overdue calculations can be done with simple numeric comparison rather than date-string parsing. |
| `status` | text | Not null, constrained to `'todo'`, `'in_progress'`, or `'complete'`, defaults to `'todo'` | The task's current status. Fixed to exactly three values, matching the brief; not user-customisable. |
| `archived_at` | integer (Unix timestamp) | Nullable | `null` when the task is active. Set to the archival timestamp when the task is archived. Used instead of a boolean flag so that *when* a task was archived is preserved for free, at no extra schema cost. |

## Design decisions

**Archiving, not deleting.** The brief specifies that a task cannot be deleted, only archived, and must remain viewable afterward. This is implemented as a nullable `archived_at` timestamp column on the task itself, rather than a separate "archive" table or a boolean flag. A `null` value means the task is active; any non-null value means it has been archived. No `DELETE` statement is ever issued against a task row anywhere in the application.

**Overdue status is never stored.** The brief requires that an overdue task be visibly flagged, but explicitly not as one of the three fixed statuses. Rather than adding a fourth status value or an `is_overdue` column, "overdue" is calculated at read time by comparing a task's `due_date` against the current time, and by checking that its status is not `'complete'`. This means the database can never hold a task in a stale or incorrect "overdue" state — the value is always freshly derived whenever tasks are displayed.

**No relationships / no additional tables.** The application has no user accounts and a fixed, small set of task-level fields, so a single `tasks` table fully satisfies the brief without introducing joins or foreign keys.

## Migrations

Schema changes are managed through `drizzle-kit`, which generates SQL migration files from `db/schema.ts`. Migration files are committed to the repository under `drizzle/migrations/`, giving the project a reviewable history of schema changes rather than a single hand-maintained `CREATE TABLE` script.
