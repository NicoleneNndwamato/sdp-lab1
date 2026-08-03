// app/edit/[id]/page.tsx
import { getTaskById } from '@/db/queries';
import { TaskForm } from '../../components/TaskForm';
import { notFound } from 'next/navigation';

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = await getTaskById(Number(id));

  if (!task) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-base font-medium mb-4">Edit Task</h2>
      <TaskForm task={task} />
    </div>
  );
}