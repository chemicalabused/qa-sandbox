import initSqlJs from 'sql.js';
import type { Database as SqlJsDatabase } from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../../data.db');

let database: SqlJsDatabase;

async function initDb(): Promise<SqlJsDatabase> {
  const SQL = await initSqlJs();

  let db: SqlJsDatabase;
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      age INTEGER NOT NULL,
      terms INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  saveDb(db);
  return db;
}

function saveDb(db: SqlJsDatabase) {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

interface User {
  id: string;
  email: string;
  password: string;
  age: number;
  terms: boolean;
}

export const db = {
  async init() {
    database = await initDb();
  },

  getUserByEmail(email: string): User | undefined {
    const stmt = database.prepare('SELECT * FROM users WHERE email = ?');
    stmt.bind([email]);
    if (stmt.step()) {
      const row = stmt.getAsObject();
      stmt.free();
      return row as unknown as User;
    }
    stmt.free();
    return undefined;
  },

  createUser(user: User): void {
    database.run(
      'INSERT INTO users (id, email, password, age, terms) VALUES (?, ?, ?, ?, ?)',
      [user.id, user.email, user.password, user.age, user.terms ? 1 : 0]
    );
    saveDb(database);
  }
};
