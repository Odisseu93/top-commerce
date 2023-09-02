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
      name,
      description,
      category,
      active: false
    }

    await Product.create(newProduct)
      .then(result => res.status(201).json({
        message: 'Product created seccessfully!',
        registeredProduct: result
      }))
      .catch(err => { throw new Error(err) })
  }


  static async update(req, res) {
    const {
      id,
      name,
      description,
      category,
      active } = req.body

    const product = { id, name, description, category, active }

    await Product.update(product, { where: { id: id } })
      .then(result => res.status(200).json({
        message: 'Product updated seccessfully!',
        updatedProduct: result
      }))
      .catch(err => { throw new Error(err) })
  }

}

module.exports = ProductController