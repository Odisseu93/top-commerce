const Product = require('../models/Product')
const { randomUUID } = require('crypto')
const { Op } = require('sequelize')
class ProductController {

  static async getAll(req, res) {
    await Product.findAll()
      .then(products => res.status(200).json({ products: products }))
      .catch(err => { throw new Error(err) })
  }


  static async getById(req, res) {
    const { id } = req.params

    await Product.findByPk(id).then(product => {
      if (!product) return res.status(404).json({ message: 'Product not found!' })
      res.status(200).json({ product: product })
    }).catch(err => { throw new Error(err) })
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
    const { id } = req.params

    const {
      name,
      description,
      category,
      active } = req.body

    const product = { name, description, category, active }

    await Product.update(product, { where: { id: id } })
      .then(result => res.status(200).json({
        message: 'Product updated seccessfully!',
        updatedProduct: result
      }))
      .catch(err => { throw new Error(err) })
  }


  static async delete(req, res) {
    const { id } = req.params

    await Product.destroy({ where: { id: id } })
      .then(() => res.status(200).json({
        message: 'Product deleted!',
      }))
      .catch(err => { throw new Error(err) })
  }


  static async filterProducts(req, res) {
    const { id, name, category, active } = req.query;
    let whereClause = {};

    if (id) {
      whereClause.id = id;
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
}

module.exports = ProductController