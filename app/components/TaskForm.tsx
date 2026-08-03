// app/components/TaskForm.tsx  (updated — replaces the previous version)
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTask, editTask } from '../actions';
import type { InferSelectModel } from 'drizzle-orm';
import type { tasks } from '@/db/schema';

type Task = InferSelectModel<typeof tasks>;

function toDateInputValue(date: Date) {
  return date.toISOString().split('T')[0];
}

export function TaskForm({ task }: { task?: Task }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const isEditing = Boolean(task);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSubmitting(true);

    const input = {
      title: formData.get('title') as string,
      description: (formData.get('description') as string) || undefined,
      topic: formData.get('topic') as string,
      dueDate: new Date(formData.get('dueDate') as string),
      status: formData.get('status') as 'todo' | 'in_progress' | 'complete',
    };

    try {
      if (isEditing && task) {
        await editTask(task.id, input);
      } else {
        await createTask(input);
      }
      router.push('/');
    } catch {
      setError('Could not save task. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={task?.title}
          className="w-full border border-black/20 dark:border-white/20 rounded px-3 py-2 bg-transparent"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={task?.description ?? ''}
          className="w-full border border-black/20 dark:border-white/20 rounded px-3 py-2 bg-transparent"
        />
      </div>

      <div>
        <label htmlFor="topic" className="block text-sm font-medium mb-1">
          Topic
        </label>
        <input
          id="topic"
          name="topic"
          type="text"
          required
          defaultValue={task?.topic}
          className="w-full border border-black/20 dark:border-white/20 rounded px-3 py-2 bg-transparent"
        />
      </div>

      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
          Due Date
        </label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          required
          defaultValue={task ? toDateInputValue(task.dueDate) : undefined}
          className="w-full border border-black/20 dark:border-white/20 rounded px-3 py-2 bg-transparent"
        />
      </div>

      {isEditing && (
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={task?.status}
            className="w-full border border-black/20 dark:border-white/20 rounded px-3 py-2 bg-transparent"
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="bg-black text-white dark:bg-white dark:text-black rounded px-4 py-2 text-sm font-medium disabled:opacity-50"
      >
        {submitting ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Task'}
      </button>
    </form>
  );
}