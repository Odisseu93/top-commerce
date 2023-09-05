const express = require('express');
const bd = require('./db/mysql');

const app = express();

const port = 8080;


const ProductRoutes = require('./routes/ProductRoutes');
const ProductFiltersRoutes = require('./routes/ProductFiltersRoutes'); 
const ProductCategoryRoutes = require('./routes/ProductCategoryRoutes'); 


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