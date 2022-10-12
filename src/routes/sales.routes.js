const express = require('express');

const router = express.Router();

const {
  salesController: { allSales, insertSale },
  salesProductsController: { salesProductsById },
} = require('../controllers');

const {
  validateProductIdField,
  validateQuantityField,
  validateQuantityNumber,
} = require('../middlewares/validadeSalesFields');

router.get('/', allSales);
router.get('/:id', salesProductsById);
router.post('/',
  validateProductIdField,
  validateQuantityField,
  validateQuantityNumber,
  insertSale);

module.exports = router;
