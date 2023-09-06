import express from 'express';

import ProductFilterController from '../controllers/ProductFilterController.js';

const router = express.Router();


router.get('/price', ProductFilterController.filterPriceInBetween);
router.get('/', ProductFilterController.filterProducts);


export default router;
