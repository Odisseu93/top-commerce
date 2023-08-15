const { GetAllProductsService } = require('../services/product/GetAllProductsService.js')

class GetAllProductsController {
  async handle(req, res) {

    const data = await new GetAllProductsService().execute()

    return res.json(data)
  }
}

module.exports = { GetAllProductsController }