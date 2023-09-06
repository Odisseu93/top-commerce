import express from 'express';

const router = express.Router();

import ProductController from '../controllers/ProductController.js';


router.get('/all', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

export default router;