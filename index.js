require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load Sequelize instance + models
const { sequelize } = require('./models');

// Load all API routes
const routes = require('./routes');
app.use('/api', routes);

// Server port
const PORT = process.env.PORT || 4000;

// Start server AFTER database connects
(async () => {
  try {
    await sequelize.authenticate();  // ❗ Only authenticate, do NOT sync
    console.log("✅ Connected to Supabase database");

    app.listen(PORT, () =>
      console.log(`🚀 RR Nagar backend running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
})();
