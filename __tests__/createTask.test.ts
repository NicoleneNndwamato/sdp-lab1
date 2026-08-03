import { createTestDb } from './helpers/testDb';
import { createTask, getTaskById } from '@/db/queries';

describe('createTask', () => {
  it('creates a task and persists it with all four fields', async () => {
    const db = createTestDb();

    const created = await createTask(
      {
        title: 'Write report',
        description: 'Finish the lab report',
        topic: 'COMS3011A',
        dueDate: new Date('2026-08-10'),
      },
      db
    );

    const fetched = await getTaskById(created.id, db);

    expect(fetched).toBeDefined();
    expect(fetched?.title).toBe('Write report');
    expect(fetched?.description).toBe('Finish the lab report');
    expect(fetched?.topic).toBe('COMS3011A');
    expect(fetched?.status).toBe('todo');
    expect(fetched?.archivedAt).toBeNull();
  });
});