const express = require('express')

const router = express.Router()

const ProductFilterController = require('../controllers/ProductFilterController')

router.get('/price', ProductFilterController.filterPriceInBetween)
router.get('/', ProductFilterController.filterProducts)


module.exports = router
