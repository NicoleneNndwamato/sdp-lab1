// app/page.tsx  (updated)
import Link from 'next/link';
import { fetchTasks } from './actions';
import { TaskList } from './components/TaskList';
import { SortControls } from './components/SortControls';
import type { SortField } from '@/db/queries';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ archived?: string; sortBy?: string }>;
}) {
  const { archived, sortBy } = await searchParams;
  const showArchived = archived === 'true';
  const sortField = sortBy as SortField | undefined;

  const allTasks = await fetchTasks({
    sortBy: sortField,
    includeArchived: true,
  });

  const tasks = showArchived
    ? allTasks.filter((task) => task.archivedAt !== null)
    : allTasks.filter((task) => task.archivedAt === null);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-medium">
          {showArchived ? 'Archived Tasks' : 'Tasks'}
        </h2>
        <div className="flex gap-4">
          <Link href="/new" className="text-sm underline">
            New Task
          </Link>
          <Link
            href={showArchived ? '/' : '/?archived=true'}
            className="text-sm underline text-black/60 dark:text-white/60"
          >
            {showArchived ? 'View active' : 'View archived'}
          </Link>
        </div>
      </div>

      {!showArchived && <SortControls currentSort={sortField} />}

      <TaskList tasks={tasks} />
    </div>
  );
}