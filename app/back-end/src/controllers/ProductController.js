const Product = require('../models/Product')
// const { GetAllProductsService } = require('../services/product/GetAllProductsService.js')

// class GetAllProductsController {
//   async handle(req, res) {

//     const data = await new GetAllProductsService().execute()

//     return res.json(data)
//   }
// }

// module.exports = { GetAllProductsController }

class ProductController {
  static async getAll(req, res) {
    const products = await Product.findAll({raw: true})

    res.send(products)
  }
}

module.exports = ProductController