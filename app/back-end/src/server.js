const express = require('express')
const bd = require('./db/mysql')

const Product = require('./models/Product')

const app = express()

const port = 8080

const ProductRoutes = require('./routes/ProductRoutes')

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.use('/products', ProductRoutes)

bd.sync()
  .then(() => app.listen(port, () => console.log(`Listen on ${port} port`)))
  .catch(err => console.error(err))