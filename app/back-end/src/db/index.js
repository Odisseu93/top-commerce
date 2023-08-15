const createProductsTable = () => {
  require('./models/Product').Product.sync({ force: true })
}

module.exports = {
  createProductsTable
}