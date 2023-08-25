const express = require('express')
const bd = require('./db/mysql')

const Product = require('./db/models/Product')

const app = express()

const port = 8080

bd.sync()
  .then(() => app.listen(port, () => console.log(`Listen on ${port} port`)))
  .catch(err => console.error(err))