// app/components/SortControls.tsx
import Link from 'next/link';
import type { SortField } from '@/db/queries';

const options: { label: string; value: SortField }[] = [
  { label: 'Topic', value: 'topic' },
  { label: 'Status', value: 'status' },
  { label: 'Due Date', value: 'dueDate' },
];

export function SortControls({ currentSort }: { currentSort?: SortField }) {
  return (
    <div className="flex gap-3 mb-4 text-sm">
      <span className="text-black/60 dark:text-white/60">Sort by:</span>
      {options.map((option) => (
        <Link
          key={option.value}
          href={`/?sortBy=${option.value}`}
          className={
            currentSort === option.value
              ? 'font-semibold underline'
              : 'underline text-black/60 dark:text-white/60'
          }
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}