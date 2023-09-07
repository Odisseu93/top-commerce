import Product from '../models/Product.js';
import Category from '../models/ProductCategory.js';

import { randomUUID } from 'crypto';

import { Request } from 'express';
import { RequestCreateType, RequestUpdateType } from '../types/controllers/Product/index.js';
import TypedResponseJson from '../types/TypedResponseJson.js';


class ProductController {

	static async getAll(
		req: Request,
		res: TypedResponseJson<{ message: string, products?: Product[] }>) {

		await Product
			.findAll({
				include: {
					model: Category,
					attributes: ['id', 'name', 'parentId'],
				},
				attributes: { exclude: ['CategoryId'] }
			})
			.then(products => {

				if (products.length === 0) {
					return res.status(200).json({ message: 'No products found!', products: products });
				}

				return res.status(200).json({
					message: 'search accomplished!',
					products: products
				});
			})
			.catch(err => { throw new Error(err); });
	}


	static async getById(
		req: Request,
		res: TypedResponseJson<{ message: string, product?: Product }>) {

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

				res.status(200).json({
					message: 'search accomplished!',
					product: product
				});
			})
			.catch(err => { throw new Error(err); });
	}


	static async create(
		req: RequestCreateType,
		res: TypedResponseJson<{ message: string, registeredProduct?: Product }>) {

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

		if (sku.length === 0) {
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


	static async update(
		req: RequestUpdateType,
		res: TypedResponseJson<{ message: string, result: unknown }>) {

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
				result: result
			}))
			.catch(err => { throw new Error(err); });
	}


	static async delete(req: Request, res: TypedResponseJson<{ message: string }>) {
		const { id } = req.params;

		await Product.destroy({ where: { id: id } })
			.then(() => res.status(200).json({
				message: 'Product deleted!',
			}))
			.catch(err => { throw new Error(err); });
	}
}

export default ProductController;