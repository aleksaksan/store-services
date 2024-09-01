const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  plu: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  }, { 
    timestamps: false 
  }
);

const Store = sequelize.define('store', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  }, { 
    timestamps: false 
  }
);

const Stock = sequelize.define('stock', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  store_quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  order_quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  }, { 
    timestamps: false 
  }
);

Stock.hasMany(Product);
Stock.hasOne(Store);

module.exports = {
  Product,
  Store,
  Stock,
};
