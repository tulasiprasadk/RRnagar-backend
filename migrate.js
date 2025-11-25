const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const databaseUrl = process.env.DATABASE_URL || 'sqlite:./data/dev.sqlite';
const sequelize = new Sequelize(databaseUrl, { logging: false });

const Supplier = sequelize.define('Supplier', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.TEXT,
  acceptedTnC: { type: DataTypes.BOOLEAN, defaultValue: false },
  metadata: DataTypes.JSON
});

const Category = sequelize.define('Category', {
  name: { type: DataTypes.STRING, allowNull: false }
});

const Product = sequelize.define('Product', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  price: { type: DataTypes.FLOAT, allowNull: false },
  isService: { type: DataTypes.BOOLEAN, defaultValue: true },
  deliveryAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
  metadata: DataTypes.JSON
});

const Order = sequelize.define('Order', {
  customerName: DataTypes.STRING,
  customerPhone: DataTypes.STRING,
  customerAddress: DataTypes.TEXT,
  type: DataTypes.ENUM('delivery', 'visit'),
  totalAmount: DataTypes.FLOAT,
  platformFee: DataTypes.FLOAT,
  status: { type: DataTypes.ENUM('created','paid','delivered','cancelled'), defaultValue: 'created' },
  paymentInfo: DataTypes.JSON
});

const Ad = sequelize.define('Ad', {
  location: DataTypes.ENUM('top','bottom','left','right'),
  title: DataTypes.STRING,
  url: DataTypes.STRING,
  imageUrl: DataTypes.STRING,
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
  order: { type: DataTypes.INTEGER, defaultValue: 0 }
});

const AnalyticsVisit = sequelize.define('AnalyticsVisit', {
  path: DataTypes.STRING,
  referrer: DataTypes.STRING,
  ip: DataTypes.STRING,
  userAgent: DataTypes.STRING
});

Supplier.hasMany(Product);
Product.belongsTo(Supplier);

Category.hasMany(Product);
Product.belongsTo(Category);

Supplier.hasMany(Order);
Order.belongsTo(Supplier);

Product.hasMany(Order);
Order.belongsTo(Product);

module.exports = {
  sequelize,
  Supplier,
  Product,
  Order,
  Ad,
  Category,
  AnalyticsVisit,
  initDb: async () => {
    await sequelize.sync();
  }
};