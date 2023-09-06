import { Optional, DataTypes, Model } from 'sequelize';

interface ProductCategoryAttributes {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  level: number;
  active: boolean;
}

interface ProductCategoryCreationAttributes
  extends Optional<
    ProductCategoryAttributes,
    'id' | 'parentId' | 'level' | 'active'
  > { }

export {
	ProductCategoryAttributes,
	ProductCategoryCreationAttributes,
	Model,
	DataTypes
};