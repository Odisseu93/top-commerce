const express = require('express');

const router = express.Router();

const ProductCategoryController = require('../controllers/ProductCategoryController');


router.get('/', ProductCategoryController.getAll);
router.get('/:id', ProductCategoryController.getById);
router.post('/', ProductCategoryController.create);

module.exports = router;
