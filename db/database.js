import Database  from "better-sqlite3"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const db = new Database(join(__dirname, 'hydration.db'));

export const initDatabase = () =>{
    db.exec(`
       CREATE TABLE IF NOT EXISTS hydration_entries(
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       amount_litres REAL NOT NULL,
       timestamp TEXT NOT NULL,
       drink_type TEXT DEFAULT 'water',
       notes TEXT,
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
        `);
        console.log("Database initialised");
};

export default db;