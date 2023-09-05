const { DataTypes } = require('sequelize');
const db = require('../db/mysql');

const { UUID, CHAR, STRING, BOOLEAN } = DataTypes;

const ProductCategory = db.define('Category', {
	id: {
		type: UUID,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: CHAR(255),
		allowNull: false,
	},
	description: {
		type: STRING,
		allowNull: false,
	},
	parentId: {
		type: UUID,
		allowNull: true,
	},
	level: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			min: 1,
			max: 3,
		},
	},
	active: {
		type: BOOLEAN,
		allowNull: false,
	},
});

ProductCategory.hasMany(ProductCategory, { as: 'children', foreignKey: 'parentId' });
ProductCategory.belongsTo(ProductCategory, { as: 'parent', foreignKey: 'parentId' });

// Custom validation to check category level against parent category level (if any)
ProductCategory.addHook('beforeValidate', (category) => {
	if (category.parentId) {
		// Search the parent category
		return ProductCategory.findByPk(category.parentId)
			.then(parentCategory => {
				if (parentCategory && parentCategory.level + 1 !== category.level) {
					throw new Error('Incorrect category level relative to parent.');
				}
			});
	}
});

module.exports = ProductCategory;
