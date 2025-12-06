const { Sequelize } = require('sequelize');
const dns = require('dns');

// 🚫 Prevent IPv6 – FORCE IPv4 DNS
dns.setDefaultResultOrder('ipv4first');

module.exports = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  // 🚫 Disable any IPv6 fallback
  host: undefined,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
