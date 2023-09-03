const Product = require('../models/Product')
const { Op } = require('sequelize')

class ProductFilterController {

  static async filterProducts(req, res) {
    const { id, sku, name, category, active } = req.query;
    let whereClause = {};

    if (id) {
      whereClause.id = id;
    }

    if (sku) {
      whereClause.sku = sku
    }

    if (name) {
      whereClause.name = { [Op.like]: `%${name}%` };
    }

    if (category) {
      whereClause.category = { [Op.like]: `%${category}%` };
    }

    if (active !== undefined) {
      whereClause.active = active === 'true';
    }

    try {
      await Product.findAll({
        where: whereClause
      }).then(products => {
        if (products.length === 0) return res.status(404).json({ message: 'Product(s) not found !' })
        res.status(200).json({ products: products })
      })
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  static async filterPriceInBetween(req, res) {
    const { initialPrice, finalPrice } = req.query
    let whereClause = {};

    if (finalPrice < initialPrice) {
      return res.status(400).json({ message: 'the "finalPrice" cannot be less than "initialPrice"' })
    }


    if (!initialPrice && !finalPrice) {
      return res.status(400).json({ message: 'the parameters "initialPrice" and "finalPrice" cannot be null!' })
    }

    switch (true) {
      case initialPrice && !finalPrice:
        whereClause.price = { [Op.gte]: [initialPrice] }
        break;

      case !initialPrice && finalPrice:
        whereClause.price = { [Op.lte]: [finalPrice] }
        break


      default:
        whereClause.price = { [Op.between]: [initialPrice, finalPrice] }
    }

    Product.findAll({ where: whereClause }).then(products => {
      if (!products || products.length === 0) return res.status(404).json({ message: 'Product(s) not found !' })

      res.status(200).json({ products: products })
    }).catch(err => { throw new Error(err) })

  }
}

module.exports = ProductFilterController