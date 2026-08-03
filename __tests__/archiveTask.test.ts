import { createTestDb } from './helpers/testDb';
import { createTask, archiveTask, getTaskById, getTasks } from '@/db/queries';

describe('archiveTask', () => {
  it('marks a task archived without deleting it, and removes it from the default list', async () => {
    const db = createTestDb();

    const created = await createTask(
      { title: 'Old task', topic: 'General', dueDate: new Date('2026-01-01') },
      db
    );

    await archiveTask(created.id, db);

    const stillExists = await getTaskById(created.id, db);
    expect(stillExists).toBeDefined();
    expect(stillExists?.archivedAt).not.toBeNull();

    const activeList = await getTasks(undefined, db);
    expect(activeList.find((t) => t.id === created.id)).toBeUndefined();

    const fullList = await getTasks({ includeArchived: true }, db);
    expect(fullList.find((t) => t.id === created.id)).toBeDefined();
  });
});