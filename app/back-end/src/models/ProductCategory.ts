import db from '../db/mysql/index.js';

import {
	ProductCategoryAttributes,
	ProductCategoryCreationAttributes,
	Model,
	DataTypes
} from '../types/models/ProductCategory/index.js';


const { UUID, INTEGER, STRING, BOOLEAN } = DataTypes;

class ProductCategory
	extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes>
	implements ProductCategoryAttributes {
	public id!: string;
	public name!: string;
	public description!: string;
	public parentId: string | null = null;
	public level!: number;
	public active!: boolean;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	products?: number;
}

ProductCategory.init(
	{
		id: {
			type: UUID,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: STRING,
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
			type: INTEGER,
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
	},
	{
		sequelize: db,
		modelName: 'ProductCategory',
	}
);

export default ProductCategory;
