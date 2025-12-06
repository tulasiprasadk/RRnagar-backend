module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    price: { type: DataTypes.FLOAT, allowNull: false },
    isService: { type: DataTypes.BOOLEAN, defaultValue: true },
    deliveryAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
    metadata: DataTypes.JSON
  });
};
