const express = require('express')

const router = express.Router()

const ProductController = require('../controllers/ProductController')

router.get('/products/all', ProductController.getAll)

module.exports = router