import db from '../db/mysql/index.js';

import ProductCategory from './ProductCategory.js';

import { Model, ProductAttributes, ProductCreationAttributes, DataTypes } from '../types/models/Products/index.js';
const { UUID, CHAR, STRING, TEXT, FLOAT, BOOLEAN } = DataTypes;

class Product
	extends Model<ProductAttributes, ProductCreationAttributes>
	implements ProductAttributes {
	public id!: string;
	public sku: string | null = null;
	public name!: string;
	public price!: number;
	public description: string | null = '';
	public CategoryId!: string;
	public active!: boolean;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Product.init(
	{
		id: {
			type: UUID,
			allowNull: false,
			primaryKey: true,
		},
		sku: {
			type: CHAR(255),
			unique: true,
		},
		name: {
			type: STRING,
			allowNull: false,
		},
		price: {
			type: FLOAT(2),
			defaultValue: 0.0,
		},
		description: {
			type: TEXT,
			allowNull: true,
			defaultValue: ''
		},
		CategoryId: {
			type: UUID,
			allowNull: false,
		},
		active: {
			type: BOOLEAN,
			allowNull: false,
		},
	},
	{
		sequelize: db,
		modelName: 'Product',
	}
);

Product.belongsTo(ProductCategory, { foreignKey: 'CategoryId', onDelete: 'CASCADE' });
ProductCategory.hasMany(Product, { foreignKey: 'CategoryId' });

export default Product;
