require('dotenv').config();

const sequelize = require('./config/database');
require('./models'); // load all model definitions

(async () => {
  try {
    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("Database connected!");

    console.log("Creating tables...");
    await sequelize.sync({ force: true });
    console.log("✅ All tables created successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
})();
