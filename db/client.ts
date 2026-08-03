import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

export function createDb(fileName: string) {
  const sqlite = new Database(fileName);
  return drizzle(sqlite, { schema });
}

export const db = createDb(process.env.DB_FILE_NAME ?? 'local.db');