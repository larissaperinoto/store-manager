const express = require('express');

const app = express();
app.use(express.json());
const { productsRoutes, salesRoutes } = require('./routes');

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

module.exports = app;
