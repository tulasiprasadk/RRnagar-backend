const { Sequelize } = require('sequelize');
const dns = require('dns');
const url = require('url');

// Parse DATABASE_URL
const dbUrl = url.parse(process.env.DATABASE_URL);

// Force IPv4 resolution of hostname
dns.setDefaultResultOrder('ipv4first');

module.exports = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  host: dbUrl.hostname,
  port: dbUrl.port || 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
