const Product = require('../models/Product')

class ProductController {
  static async getAll(req, res) {
    await Product.findAll()
      .then(products => res.status(200).json({ products: products }))
      .catch(err => { throw new Error(err) })
  }
}

module.exports = ProductController