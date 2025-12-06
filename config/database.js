const { Sequelize } = require('sequelize');
const dns = require('dns');

// Force IPv4 resolution globally
dns.setDefaultResultOrder('ipv4first');

const url = new URL(process.env.DATABASE_URL);

// Extract host (Supabase database hostname)
const host = url.hostname;

// Build connection manually
module.exports = new Sequelize(
  url.pathname.substring(1),   // database name
  url.username,                // user
  url.password,                // password
  {
    host: host,                // ⛔ Forces IPv4 DNS lookup
    port: 5432,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);
