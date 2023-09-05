const Product = require('../models/Product');
const Category = require('../models/ProductCategory');

const { randomUUID } = require('crypto');
class ProductController {

	static async getAll(req, res) {
		await Product
			.findAll({
				include: {
					model: Category,
					attributes: ['id', 'name', 'parentId'],
				},
				attributes: { exclude: ['CategoryId'] }
			})
			.then(products => res.status(200).json({ products: products }))
			.catch(err => { throw new Error(err); });
	}



	static async getById(req, res) {
		const { id } = req.params;

		await Product
			.findByPk(id, {
				include: {
					model: Category,
					attributes: ['id', 'name', 'parentId'],
				},
				attributes: { exclude: ['CategoryId'] }
			})
			.then(product => {
				if (!product) return res.status(404).json({ message: 'Product not found!' });

				res.status(200).json({ product: product });
			})
			.catch(err => { throw new Error(err); });
	}


	static async create(req, res) {
		const { sku, name, price, description, CategoryId } = req.body;
		const uuid = randomUUID();

		const newProduct = {
			id: uuid,
			sku,
			name,
			price,
			description,
			CategoryId,
			active: false
		};

		// validations 
		const existingProduct = await Product.findOne({ where: { sku } });

		if(sku.length === 0) {
			return res.status(400).json({
				message: 'Use a unique SKU or set it to null!',
			});
		}

		if (existingProduct && existingProduct.sku) {
			return res.status(400).json({
				message: 'The SKU already exists. Use a unique SKU or set it to null!',
			});
		}

		if (!name || name.length < 4) {
			return res.status(400).json({
				message: 'product name cannot be less than 4 characters, or be empty!',
			});
		}

		if (!CategoryId) {
			return res.status(400).json({
				message: 'CategoryId cannot be null',
			});
		}

		await Product.create(newProduct)
			.then(result => res.status(201).json({
				message: 'Product created seccessfully!',
				registeredProduct: result
			}))
			.catch(err => { throw new Error(err); });
	}


	static async update(req, res) {
		const { id } = req.params;

		const {
			sku,
			name,
			price,
			description,
			CategoryId,
			active } = req.body;

		const product = { sku, name, price, description, CategoryId, active };

		await Product.update(product, { where: { id: id } })
			.then(result => res.status(200).json({
				message: 'Product updated seccessfully!',
				updatedProduct: result
			}))
			.catch(err => { throw new Error(err); });
	}


	static async delete(req, res) {
		const { id } = req.params;

		await Product.destroy({ where: { id: id } })
			.then(() => res.status(200).json({
				message: 'Product deleted!',
			}))
			.catch(err => { throw new Error(err); });
	}
}

module.exports = ProductController;