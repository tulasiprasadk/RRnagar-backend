const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Load Models
const Ad = require('./Ad')(sequelize, DataTypes);
const Supplier = require('./Supplier')(sequelize, DataTypes);
const Category = require('./Category')(sequelize, DataTypes);
const Product = require('./Product')(sequelize, DataTypes);
const Order = require('./Order')(sequelize, DataTypes);
const AnalyticsVisit = require('./AnalyticsVisit')(sequelize, DataTypes);
const StockHistory = require('./StockHistory')(sequelize, DataTypes);
const Shop = require('./Shop')(sequelize, DataTypes);

/* ===========================
   MODEL RELATIONS
=========================== */

// Supplier → Products
Supplier.hasMany(Product);
Product.belongsTo(Supplier);

// Category → Products
Category.hasMany(Product);
Product.belongsTo(Category);

// Supplier → Orders
Supplier.hasMany(Order);
Order.belongsTo(Supplier);

// Product → Orders
Product.hasMany(Order);
Order.belongsTo(Product);

// Product → Stock History
Product.hasMany(StockHistory);
StockHistory.belongsTo(Product);

// (Shops currently have no relations — optional)

/* ===========================
   EXPORT MODELS
=========================== */

module.exports = {
  sequelize,
  Ad,
  Supplier,
  Category,
  Product,
  Order,
  AnalyticsVisit,
  StockHistory,
  Shop
};
