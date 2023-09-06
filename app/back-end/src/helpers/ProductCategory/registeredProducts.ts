import Product from '../../models/Product.js';

import { ProductCategoryAttributes } from '../../types/models/ProductCategory/index.js';

const registeredProducts = (category: ProductCategoryAttributes) => {
	const productCount = Product.count({ where: { CategoryId: category.id } });

	return productCount;
};

export default registeredProducts;