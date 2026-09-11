const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'adsqonevo_db',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

let isConnected = false;

// Initialize database table if not present
async function initDb() {
  try {
    const client = await pool.connect();
    isConnected = true;
    console.log(`[PostgreSQL] Connected to database '${process.env.DB_NAME || 'adsqonevo_db'}' on ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}`);
    
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone_number VARCHAR(50) NOT NULL,
        company_name VARCHAR(255),
        website_url VARCHAR(255),
        message TEXT,
        downloaded_brochure BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
      CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
    `;
    await client.query(createTableQuery);
    console.log(`[PostgreSQL] 'leads' table schema verified.`);
    client.release();
    return true;
  } catch (err) {
    isConnected = false;
    console.warn(`[PostgreSQL Warning] Could not connect to PostgreSQL database: ${err.message}`);
    console.warn(`[PostgreSQL Warning] Ensure PostgreSQL is running and your server/.env credentials (host, user, password, db name, port) are configured.`);
    return false;
  }
}

function getStatus() {
  return {
    connected: isConnected,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    database: process.env.DB_NAME || 'adsqonevo_db',
    user: process.env.DB_USER || 'postgres'
  };
}

module.exports = {
  pool,
  initDb,
  getStatus
};
