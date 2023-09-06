import ProductCategory from '../models/ProductCategory.js';
import Product from '../models/Product.js';

import { randomUUID } from 'crypto';
import registeredProducts from '../helpers/ProductCategory/registeredProducts.js';
import Validate from '../helpers/ProductCategory/Validate.js';

import { Request } from 'express';
import TypedResponseJson from '../types/TypedResponseJson.js';
import TypedRequestBody from '../types/TypedRequestBody.js';


const includeProducts = {
	include: {
		model: Product,
		attributes: [],
	},
	group: ['ProductCategory.id'],
	raw: true
};


class ProductCategoryController {

	static async getAll(
		req: Request,
		res: TypedResponseJson<{ message: string, categories?: ProductCategory[] }>) {

		await ProductCategory.findAll(includeProducts).then(async (categories) => {

			for (const category of categories) {
				// adding product counting
				category.products = await registeredProducts(category);
			}

			res.status(200).json({
				message: 'search accomplished!',
				categories: categories
			});
		}).catch(err => { throw new Error(err); });
	}


	static async getById(
		req: Request,
		res: TypedResponseJson<{ message: string, category?: ProductCategory }>) {

		const { id } = req.params;

		await ProductCategory.findByPk(id, includeProducts).then(async category => {

			if (!category) {
				return res.status(404).json({ message: 'Category not found!' });
			}

			category.products = await registeredProducts(category);

			res.status(200).json({
				message: 'search accomplished!',
				category: category
			});
		}).catch(err => { throw new Error(err); });
	}


	static async create(

		req: TypedRequestBody<{
			name: string
			description: string
			parentId: string
			level: number
		}>,
		res: TypedResponseJson<{
			message: string
			registeredCategory?: ProductCategory
		}>) {

		const { name, description, parentId, level } = req.body;
		const uuid = randomUUID();

		const newCategory = {
			id: uuid,
			name,
			description,
			parentId,
			level,
			active: true
		};

		if (await Validate.isValidName(name) === false) {
			return res.status(400).json({
				message: 'Category name cannot be empty',
			});
		}

		if (await Validate.isUniqueName(name) === false) {
			return res.status(400).json({
				message: 'This category already exists!',
			});
		}


		if (await Validate.isValidParent(parentId) === false) {
			return res.status(400).json({
				message: 'Invalid "parentID" !',
			});
		}

		if (await Validate.isValidSubcategory(parentId) === false) {
			return res.status(400).json({
				message: 'It is not allowed to add more subcategories to a level 3 category!',
			});
		}

		if (await Validate.acceptableLevel(level) === false) {
			return res.status(400).json({
				message: 'Category must be between level 1 to 3!',
			});
		}

		await ProductCategory.create(newCategory)
			.then(result => res.status(201).json({
				message: 'Category created seccessfully!',
				registeredCategory: result
			}))
			.catch(err => {
				return res.status(500).json({
					message: err,
				});
			});
	}
}

export default ProductCategoryController;