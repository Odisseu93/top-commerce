const { DataTypes } = require('sequelize');
const db = require('../db/mysql');

const ProductCategory = require('./ProductCategory'); 

const { UUID, CHAR, STRING, FLOAT, TEXT, BOOLEAN } = DataTypes;

const Product = db.define('Product', {
	id: {
		type: UUID,
		allowNull: false,
		primaryKey: true
	},
	sku: {
		type: CHAR(255),
		unique: true
	},
	name: {
		type: STRING,
		allowNull: false,
	},
	price: {
		type: FLOAT(2),
		defaultValue: 0.00
	},
	description: {
		type: TEXT,
		allowNull: true,
	},
	CategoryId: {
		type: UUID,
		allowNull: false,
	},
	active: {
		type: BOOLEAN,
		allowNull: false,
	}
});

Product.belongsTo(ProductCategory, { foreignKey: 'CategoryId', onDelete: 'CASCADE' });
ProductCategory.hasMany(Product, { foreignKey: 'CategoryId' });

module.exports = Product; 