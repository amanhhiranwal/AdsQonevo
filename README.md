# AdsQonevo — Full-Stack Lead Capture & Brochure Download Application

A modern Next.js static/client application powered by an Express API backend and PostgreSQL database integration. Built to capture inquiries and deliver the Qonevo 2026 Product Brochure.

---

## Features
- **Accurate UI Design**: Matches the "Let's connect" design system with clean minimalist underlines, typography, and responsive spacing.
- **Conditional Brochure Download**: The **Download Brochure** button stays disabled until required fields (`Full Name`, `Email`, `Phone Number`) are filled with valid data.
- **PostgreSQL Database Integration**: Direct connection using `pg` connection pool with automatic table initialization (`leads` table).
- **Environment Configuration**: Sample `.env.example` provided for host name, port, user, password, database name, and client URL.
- **Resilient Fallback**: If PostgreSQL is offline during initial UI testing, the backend logs clear connection alerts and the frontend handles status gracefully.
- **Brochure Asset Bundled**: Includes `Qonevo_Brochure_2026.pdf` ready for download.

---

## Project Structure

```
AdsQonevo/
├── client/                     # Next.js 14 Frontend Application
│   ├── public/
│   │   └── Qonevo_Brochure_2026.pdf  # Downloadable product brochure
│   ├── src/
│   │   └── app/
│   │       ├── globals.css     # Minimalist underline input styles
│   │       ├── layout.tsx      # Root metadata and page shell
│   │       └── page.tsx        # "Let's connect" form & validation
│   ├── .env.example            # Client env template
│   ├── .env.local              # Local client env (points to backend:5001)
│   └── package.json
│
├── server/                     # Node.js + Express Backend
│   ├── src/
│   │   ├── db.js               # PostgreSQL pool & auto table creator
│   │   └── server.js           # API endpoints (/api/leads, /api/brochure)
│   ├── schema.sql              # Database schema for manual setup
│   ├── public/                 # Static brochure fallback
│   ├── .env.example            # Server env template (DB credentials)
│   ├── .env                    # Local server env
│   └── package.json
│
├── package.json                # Root launcher scripts
└── README.md
```

---

## Database Configuration

### 1. Configure `.env` in `server/`
Copy `server/.env.example` to `server/.env` and update your PostgreSQL credentials:

```env
PORT=5001
CLIENT_URL=http://localhost:3000

# PostgreSQL Database Credentials
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=adsqonevo_db
```

### 2. Database Schema
When the Express server connects to PostgreSQL, it will **automatically create** the `leads` table and indices. 
If you prefer running manual SQL, use `server/schema.sql`:

```sql
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
```

---

## Getting Started

### 1. Install Dependencies
```bash
# In the root directory:
npm run setup

# Or individually:
cd server && npm install
cd ../client && npm install
```

### 2. Run the Development Servers
You can run both client and server or start them separately:

```bash
# Terminal 1: Start Express Backend (Runs on http://localhost:5001)
npm run dev:server

# Terminal 2: Start Next.js Frontend (Runs on http://localhost:3000)
npm run dev:client
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Endpoints

- `GET /api/health`: Health status & PostgreSQL connection check
- `POST /api/leads`: Submits form data and records in PostgreSQL table `leads`
- `GET /api/brochure`: Serves the PDF brochure attachment
