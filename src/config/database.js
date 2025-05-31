const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const initializeDB = async () => {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database,
  });

  // Enable foreign key support
  await db.exec('PRAGMA foreign_keys = ON;');

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      accountId TEXT UNIQUE NOT NULL,
      accountName TEXT NOT NULL,
      appSecretToken TEXT NOT NULL,
      website TEXT
    );
    
    CREATE TABLE IF NOT EXISTS destinations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      accountId INTEGER NOT NULL,
      url TEXT NOT NULL,
      httpMethod TEXT NOT NULL,
      headers TEXT NOT NULL,
      FOREIGN KEY (accountId) REFERENCES accounts(id) ON DELETE CASCADE
    );
  `);

  return db;
};

module.exports = initializeDB;