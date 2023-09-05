const Product = require('../../models/Product');

const registeredProducts =  category => {
	const productCount =  Product.count({where: { CategoryId: category.id }});

	return productCount;
};

module.exports = registeredProducts;