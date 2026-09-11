-- SQL Schema for AdsQonevo Leads and Inquiries
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

-- Index on email and created_at for fast querying
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
