const Product = require('../models/Product')

class ProductController {
  static async getAll(req, res) {
    const products = await Product.findAll({raw: true})

    res.send(products)
  }
}

module.exports = ProductController