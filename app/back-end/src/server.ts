import express from 'express';
import bd from './db/mysql/index.js';

import ProductRoutes from './routes/ProductRoutes.js';
import ProductFiltersRoutes from './routes/ProductFiltersRoutes.js'; 
import ProductCategoryRoutes from './routes/ProductCategoryRoutes.js'; 

const app = express();

const port = 8080;

app.use(express.urlencoded({
	extended: true
}));

app.use(express.json());

app.use('/products', ProductRoutes);
app.use('/filter/products', ProductFiltersRoutes);
app.use('/category/products', ProductCategoryRoutes);

bd.sync()
	.then(() => app.listen(port, () => console.log(`Listen on ${port} port`)))
	.catch(err => console.error(err));