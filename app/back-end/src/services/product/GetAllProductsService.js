const { Product } = require('../../models/Product')

class GetAllProductsService {

  async execute() {


    const products = await Product.findAll()

    return products.map(product => {

      const data = {
        sku: product.sku,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        active: product.active,
        stock: product.stock
      }

      return data
    })

  }

}

module.exports = { GetAllProductsService }