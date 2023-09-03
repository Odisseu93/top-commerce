const express = require('express')

const router = express.Router()

const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.filterProducts)

module.exports = router
