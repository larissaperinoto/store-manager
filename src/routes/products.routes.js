const express = require('express');

const router = express.Router();

const { productController: { allProducts, productsById, newProduct } } = require('../controllers');

router.get('/', allProducts);
router.get('/:id', productsById);
router.post('/', newProduct);

module.exports = router;
