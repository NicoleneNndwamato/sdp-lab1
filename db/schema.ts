import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  topic: text('topic').notNull(),
  dueDate: integer('due_date', { mode: 'timestamp' }).notNull(),
  status: text('status', { enum: ['todo', 'in_progress', 'complete'] })
    .notNull()
    .default('todo'),
  archivedAt: integer('archived_at', { mode: 'timestamp' }),
});