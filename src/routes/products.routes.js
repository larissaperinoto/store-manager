const express = require('express');

const router = express.Router();

const { productsController: { allProducts, productsById, newProduct } } = require('../controllers');
const {
  validateProductNameField,
  validateProductNameSize,
} = require('../middlewares/validateProductNameField');

router.get('/', allProducts);
router.get('/:id', productsById);
router.post('/',
  validateProductNameField,
  validateProductNameSize,
  newProduct);

module.exports = router;
