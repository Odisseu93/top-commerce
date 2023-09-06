import Product from '../models/Product.js';
import { Op } from 'sequelize';

import TypedResponseJson from '../types/TypedResponseJson.js';
import TypedRequestQuery from '../types/TypedRequestQuery.js';

class ProductFilterController {

	static async filterProducts(
		req: TypedRequestQuery<{
			id: string
			sku: string
			name: string
			category: string
			active: string
		}>,
		res: TypedResponseJson<{ message: string, products?: Product[] }>) {

		const { id, sku, name, category, active } = req.query;

		type WhereClause = {
			id: string
			sku: string
			name: object
			category: object
			active: boolean
		}

		const whereClause = {} as WhereClause;

		if (id) {
			whereClause.id = id;
		}

		if (sku) {
			whereClause.sku = sku;
		}

		if (name) {
			whereClause.name = { [Op.like]: `%${name}%` };
		}

		if (category) {
			whereClause.category = { [Op.like]: `%${category}%` };
		}

		if (active !== undefined) {
			whereClause.active = active == 'true';
		}

		try {
			await Product.findAll({
				where: whereClause
			}).then(products => {
				if (products.length === 0) return res.status(404).json({ message: 'Product(s) not found !' });
				res.status(200).json({
					message: 'search accomplished!',
					products: products
				});
			});
		} catch (err) {
			res.status(500).json({ message: 'Internal server error' });
		}
	}


	static async filterPriceInBetween(
		req: TypedRequestQuery<{
			initialPrice?: string,
			finalPrice?: string
		}>,
		res: TypedResponseJson<{ message: string, products?: Product[] }>) {

		type WhereClause = {
			price: object | number
		}

		const { initialPrice, finalPrice } = req.query;
		const whereClause: WhereClause = {} as WhereClause;

		const initP = Number(initialPrice);
		const fnlP = Number(finalPrice);

		if (fnlP < initP) {
			return res.status(400).json({ message: 'the "finalPrice" cannot be less than "initialPrice"' });
		}


		if (!initialPrice && !finalPrice) {
			return res.status(400).json({ message: 'the parameters "initialPrice" and "finalPrice" cannot be null!' });
		}

		switch (true) {
		case initialPrice && !finalPrice:
			whereClause.price = { [Op.gte]: [initP] };
			break;

		case !initialPrice && finalPrice !== undefined:
			whereClause.price = { [Op.lte]: [fnlP] };
			break;


		default:
			whereClause.price = { [Op.between]: [initP, fnlP] };
		}

		Product.findAll({ where: whereClause }).then(products => {
			if (!products || products.length === 0) return res.status(404).json({ message: 'Product(s) not found !' });

			res.status(200).json({
				message: 'search accomplished!',
				products: products
			});
		}).catch(err => { throw new Error(err); });

	}
}

export default ProductFilterController;