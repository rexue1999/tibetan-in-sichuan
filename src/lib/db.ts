import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'tibet.db');

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initSchema(db);
  }
  return db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS routes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      route_slug TEXT,
      locale TEXT DEFAULT 'en',
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  const count = db.prepare('SELECT COUNT(*) as cnt FROM routes').get() as { cnt: number };
  if (count.cnt === 0) {
    seedRoutes(db);
  }
}

function seedRoutes(db: Database.Database) {
  const insert = db.prepare('INSERT INTO routes (slug) VALUES (?)');
  insert.run('tibetan-walk-chengdu');
  insert.run('go-west-go-tibet');
  insert.run('tibetan-nomad');
}

export function getRoutes() {
  return getDb().prepare('SELECT * FROM routes ORDER BY id').all();
}

export function getRouteBySlug(slug: string) {
  return getDb().prepare('SELECT * FROM routes WHERE slug = ?').get(slug);
}
