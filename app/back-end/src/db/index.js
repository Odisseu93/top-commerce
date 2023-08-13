const initDb = () => {
  require('./models/Product').Product.sync({ force: true })
}

module.exports = {
  initDb
}