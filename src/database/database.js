import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databaseDirectory = path.resolve(__dirname, "../../database");

if (!fs.existsSync(databaseDirectory)) {
    fs.mkdirSync(databaseDirectory, { recursive: true });
}

const databasePath = path.join(databaseDirectory, "rail_madad.db");

const db = new Database(databasePath);

db.pragma("foreign_keys = ON");

console.log("✓ SQLite database connected");

export default db;