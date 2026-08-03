// lib/overdue.ts
export function isOverdue(dueDate: Date, status: 'todo' | 'in_progress' | 'complete'): boolean {
  if (status === 'complete') return false;
  return dueDate.getTime() < Date.now();
}