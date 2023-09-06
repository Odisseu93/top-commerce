import { Optional, DataTypes, Model } from 'sequelize';

interface ProductAttributes {
  id: string;
  sku: string | null;
  name: string;
  price: number;
  description: string | null;
  CategoryId: string;
  active: boolean;
}

interface ProductCreationAttributes
  extends Optional<ProductAttributes, 'id' | 'sku' | 'description'> { }

export {
	ProductAttributes,
	ProductCreationAttributes,
	Model,
	DataTypes
};