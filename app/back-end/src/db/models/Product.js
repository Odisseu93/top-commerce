const { DataTypes } = require('sequelize')
const db = require('../mysql')

const { INTEGER, STRING, TEXT, BOOLEAN } = DataTypes

const Product = db.define('Product', {
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