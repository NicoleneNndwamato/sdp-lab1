import { asc, eq } from 'drizzle-orm';
import { db } from './client';
import { tasks } from './schema';

export type SortField = 'topic' | 'status' | 'dueDate';

export type NewTaskInput = {
  title: string;
  description?: string;
  topic: string;
  dueDate: Date;
  status?: 'todo' | 'in_progress' | 'complete';
};

export type EditTaskInput = Partial<NewTaskInput>;

export async function createTask(input: NewTaskInput, database = db) {
  const [task] = await database.insert(tasks).values(input).returning();
  return task;
}

export async function getTasks(
  options?: { sortBy?: SortField; includeArchived?: boolean },
  database = db
) {
  const sortColumn =
    options?.sortBy === 'status'
      ? tasks.status
      : options?.sortBy === 'dueDate'
        ? tasks.dueDate
        : tasks.topic;

  const rows = await database.select().from(tasks).orderBy(asc(sortColumn));

  if (options?.includeArchived) {
    return rows;
  }
  return rows.filter((task) => task.archivedAt === null);
}

export async function getTaskById(id: number, database = db) {
  const [task] = await database.select().from(tasks).where(eq(tasks.id, id));
  return task;
}

export async function editTask(id: number, input: EditTaskInput, database = db) {
  const [task] = await database
    .update(tasks)
    .set(input)
    .where(eq(tasks.id, id))
    .returning();
  return task;
}

export async function archiveTask(id: number, database = db) {
  const [task] = await database
    .update(tasks)
    .set({ archivedAt: new Date() })
    .where(eq(tasks.id, id))
    .returning();
  return task;
}