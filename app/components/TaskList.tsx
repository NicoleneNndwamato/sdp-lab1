// app/components/TaskList.tsx
import { TaskRow } from './TaskRow';
import type { InferSelectModel } from 'drizzle-orm';
import type { tasks } from '@/db/schema';

type Task = InferSelectModel<typeof tasks>;

export function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <p className="text-black/60 dark:text-white/60 text-sm">
        No tasks yet.
      </p>
    );
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </ul>
  );
}