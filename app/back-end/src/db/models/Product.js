const { DataTypes } = require('sequelize')

const { INTEGER, STRING, TEXT, BOOLEAN } = DataTypes

const Product = require('../mysql').dbConfig.define('Product', {
  sku: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: TEXT,
    allowNull: true,
  },
  category: {
    type: STRING,
    allowNull: false,
  },
  active: {
    type: BOOLEAN,
    allowNull: false,
  }
})


module.exports = { Product }