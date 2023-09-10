import express from 'express';

import bd from './db/mysql/index.js';

import cors from 'cors';

import ProductRoutes from './routes/ProductRoutes.js';
import ProductFiltersRoutes from './routes/ProductFiltersRoutes.js'; 
import ProductCategoryRoutes from './routes/ProductCategoryRoutes.js'; 
import docsRoutes from './routes/docsRoutes.js';

const app = express();

const port = 8080;

app.use(express.urlencoded({
	extended: true
}));

app.use(express.json());
app.use(cors());

app.use('/products/category', ProductCategoryRoutes);
app.use('/products/filter', ProductFiltersRoutes);
app.use('/products', ProductRoutes);
app.use('/docs', docsRoutes);

bd.sync()
	.then(() => app.listen(port, () => console.log(`Listen on ${port} port`)))
	.catch(err => console.error(err));