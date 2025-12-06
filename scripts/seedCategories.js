// scripts/seedCategories.js
const { Category, sequelize } = require("../models");

async function seedCategories() {
  const categories = [
    { name: "Groceries", icon: "🛒" },
    { name: "Flowers", icon: "🌸" },
    { name: "Pet Services", icon: "🐶" },
    { name: "Travels", icon: "🚕" },
    { name: "Home Services", icon: "🏠" },
    { name: "Restaurants", icon: "🍽️" }
  ];

  await sequelize.sync({ force: false });

  console.log("Clearing old categories...");
  await Category.destroy({ where: {} });

  console.log("Adding new categories...");
  for (const cat of categories) {
    await Category.create(cat);
  }

  console.log("✔ Categories seeded successfully!");
  process.exit();
}

seedCategories();
