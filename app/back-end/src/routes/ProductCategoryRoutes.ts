import express from 'express';

import ProductCategoryController from '../controllers/ProductCategoryController.js';

const router = express.Router();

router.get('/', ProductCategoryController.getAll);
router.get('/:id', ProductCategoryController.getById);
router.post('/', ProductCategoryController.create);
router.put('/:id', ProductCategoryController.update);

export default router;
