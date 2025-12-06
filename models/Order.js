module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Order', {
    customerName: DataTypes.STRING,
    customerPhone: DataTypes.STRING,
    customerAddress: DataTypes.TEXT,
    type: DataTypes.ENUM('delivery', 'visit'),
    totalAmount: DataTypes.FLOAT,
    platformFee: DataTypes.FLOAT,
    status: { 
      type: DataTypes.ENUM('created', 'paid', 'delivered', 'cancelled'),
      defaultValue: 'created'
    },
    paymentInfo: DataTypes.JSON
  });
};
