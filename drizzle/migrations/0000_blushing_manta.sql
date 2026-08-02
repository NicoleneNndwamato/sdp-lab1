CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`topic` text NOT NULL,
	`due_date` integer NOT NULL,
	`status` text DEFAULT 'todo' NOT NULL,
	`archived_at` integer
);
