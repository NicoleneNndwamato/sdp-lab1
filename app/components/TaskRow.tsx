// app/components/TaskRow.tsx  (updated)
import Link from 'next/link';
import { isOverdue } from '@/lib/overdue';
import { archiveTask } from '../actions';
import type { InferSelectModel } from 'drizzle-orm';
import type { tasks } from '@/db/schema';

type Task = InferSelectModel<typeof tasks>;

export function TaskRow({ task }: { task: Task }) {
  const overdue = isOverdue(task.dueDate, task.status);

  async function handleArchive(formData: FormData) {
    await archiveTask(task.id);
  }

  return (
    <li className="flex items-center justify-between border-b border-black/10 dark:border-white/10 py-3">
      <div>
        <p className="font-medium">
          {task.title}
          {overdue && (
            <span className="ml-2 text-xs font-semibold text-red-600">
              OVERDUE
            </span>
          )}
        </p>
        <p className="text-sm text-black/60 dark:text-white/60">
          {task.topic} · {task.status}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link href={`/edit/${task.id}`} className="text-sm underline">
          Edit
        </Link>
        {!task.archivedAt && (
          <form action={handleArchive}>
            <button type="submit" className="text-sm underline text-black/60 dark:text-white/60">
              Archive
            </button>
          </form>
        )}
      </div>
    </li>
  );
}