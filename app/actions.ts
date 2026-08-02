'use server';

import { revalidatePath } from 'next/cache';
import {
  createTask as createTaskInDb,
  editTask as editTaskInDb,
  archiveTask as archiveTaskInDb,
  getTasks,
  type NewTaskInput,
  type EditTaskInput,
  type SortField,
} from '@/db/queries';

export async function createTask(input: NewTaskInput) {
  const task = await createTaskInDb(input);
  revalidatePath('/');
  return task;
}

export async function editTask(id: number, input: EditTaskInput) {
  const task = await editTaskInDb(id, input);
  revalidatePath('/');
  return task;
}

export async function archiveTask(id: number) {
  const task = await archiveTaskInDb(id);
  revalidatePath('/');
  return task;
}

export async function fetchTasks(options?: {
  sortBy?: SortField;
  includeArchived?: boolean;
}) {
  return getTasks(options);
}