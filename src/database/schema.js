import db from "./database.js";

function initializeDatabase() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS complaints (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            complaint_id TEXT UNIQUE NOT NULL,
            passenger_name TEXT NOT NULL,
            phone TEXT,
            train_number TEXT,
            pnr TEXT,
            coach_number TEXT,
            seat_number TEXT,
            journey_date TEXT,
            description TEXT NOT NULL,
            media_path TEXT,
            media_type TEXT,
            category TEXT,
            confidence REAL,
            priority TEXT,
            department TEXT,
            sentiment TEXT,
            ocr_text TEXT,
            metadata TEXT,
            status TEXT DEFAULT 'REGISTERED',
            official_remarks TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            resolved_at TEXT
        );

        CREATE TABLE IF NOT EXISTS status_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            complaint_id TEXT NOT NULL,
            old_status TEXT,
            new_status TEXT NOT NULL,
            remarks TEXT,
            updated_by TEXT,
            timestamp TEXT NOT NULL,
            FOREIGN KEY (complaint_id)
                REFERENCES complaints(complaint_id)
                ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS departments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            description TEXT
        );

        CREATE TABLE IF NOT EXISTS resources (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            department TEXT NOT NULL,
            total INTEGER DEFAULT 0,
            available INTEGER DEFAULT 0,
            allocated INTEGER DEFAULT 0
        );
    `);

    console.log("✓ Database tables initialized");
}

export default initializeDatabase;