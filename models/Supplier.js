module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Supplier', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    acceptedTnC: { type: DataTypes.BOOLEAN, defaultValue: false },
    metadata: DataTypes.JSON
  });
};
