const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { pool, initDb, getStatus } = require('./db');

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Serve static assets (such as brochure PDF)
app.use('/static', express.static(path.join(__dirname, '../public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: getStatus()
  });
});

// Download brochure endpoint
app.get('/api/brochure', (req, res) => {
  const filePath = path.join(__dirname, '../public/Qonevo_Brochure_2026.pdf');
  res.download(filePath, 'Qonevo_Brochure_2026.pdf', (err) => {
    if (err) {
      console.error('[Download Error]', err);
      if (!res.headersSent) {
        res.status(404).json({ error: 'Brochure file not found.' });
      }
    }
  });
});

// Lead capture endpoint
app.post('/api/leads', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      companyName = '',
      websiteUrl = '',
      message = '',
      downloadedBrochure = false
    } = req.body;

    // Validation
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return res.status(400).json({ error: 'Full Name is required.' });
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'Email is required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }
    if (!phoneNumber || typeof phoneNumber !== 'string' || !phoneNumber.trim()) {
      return res.status(400).json({ error: 'Phone Number is required.' });
    }

    // Insert into PostgreSQL
    try {
      const insertQuery = `
        INSERT INTO leads (full_name, email, phone_number, company_name, website_url, message, downloaded_brochure)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, created_at;
      `;
      const values = [
        fullName.trim(),
        email.trim().toLowerCase(),
        phoneNumber.trim(),
        companyName.trim() || null,
        websiteUrl.trim() || null,
        message.trim() || null,
        Boolean(downloadedBrochure)
      ];

      const result = await pool.query(insertQuery, values);
      const newLead = result.rows[0];

      return res.status(201).json({
        success: true,
        message: 'Your inquiry has been submitted successfully.',
        leadId: newLead.id,
        downloadUrl: '/api/brochure'
      });
    } catch (dbError) {
      console.error('[Database Insert Error]', dbError.message);
      
      // If DB is offline or table does not exist, return a descriptive response
      return res.status(503).json({
        success: false,
        error: 'Database connection failed. Please check PostgreSQL status in server/.env.',
        details: dbError.message,
        downloadUrl: '/api/brochure' // Allow frontend fallback if desired
      });
    }
  } catch (error) {
    console.error('[Server Error]', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Start server and initialize database
app.listen(PORT, async () => {
  console.log(`[AdsQonevo Backend] Express server running on http://localhost:${PORT}`);
  await initDb();
});
