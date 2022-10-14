const express = require('express');

const router = express.Router();

const {
  salesController: { allSales, insertSale, deleteSale },
  salesProductsController: { salesProductsById, updateSale },
} = require('../controllers');

const {
  validateProductIdField,
  validateQuantityField,
  validateQuantityNumber,
} = require('../middlewares/validadeSalesFields');

router.get('/', allSales);
router.get('/:id', salesProductsById);
router.delete('/:id', deleteSale);

router.use(
  validateProductIdField,
  validateQuantityField,
  validateQuantityNumber,
);
router.post('/', insertSale);
router.put('/:id', updateSale);

module.exports = router;
