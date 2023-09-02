const Product = require('../models/Product')
const { randomUUID } = require('crypto')
class ProductController {

  static async getAll(req, res) {
    await Product.findAll()
      .then(products => res.status(200).json({ products: products }))
      .catch(err => { throw new Error(err) })
  }


  static async create(req, res) {
    const { name, description, category } = req.body
    const uuid = randomUUID()

    const newProduct = {
      id: uuid,
      name: name,
      description: description,
      category: category,
      active: false
    }

    await Product.create(newProduct)
      .then(product => res.status(201).json({
        message: 'Product created seccessfully!',
        registeredProduct: product
      }))
      .catch(err => { throw new Error(err) })
  }
}

module.exports = ProductController