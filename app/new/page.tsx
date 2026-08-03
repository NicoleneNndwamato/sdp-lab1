// app/new/page.tsx
import { TaskForm } from '../components/TaskForm';

export default function NewTaskPage() {
  return (
    <div>
      <h2 className="text-base font-medium mb-4">New Task</h2>
      <TaskForm />
    </div>
  );
}