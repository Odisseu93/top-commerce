const { DataTypes } = require('sequelize')
const db = require('../db/mysql')

const { UUID, STRING, TEXT, BOOLEAN } = DataTypes

const Product = db.define('Product', {
  id: {
    type: UUID,
    allowNull: false,
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

module.exports = Product 