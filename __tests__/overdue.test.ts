import { isOverdue } from '@/lib/overdue';

describe('isOverdue', () => {
  it('returns true for a past due date with a non-complete status', () => {
    const pastDate = new Date('2020-01-01');
    expect(isOverdue(pastDate, 'todo')).toBe(true);
  });

  it('returns false for a future due date', () => {
    const futureDate = new Date('2099-01-01');
    expect(isOverdue(futureDate, 'todo')).toBe(false);
  });

  it('returns false for a past due date if the task is complete', () => {
    const pastDate = new Date('2020-01-01');
    expect(isOverdue(pastDate, 'complete')).toBe(false);
  });
});