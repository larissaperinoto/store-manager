const express = require('express');

const router = express.Router();

const { productsController:
  { allProducts, productsById, newProduct, updateProduct, deleteProduct },
} = require('../controllers');

const {
  validateProductNameField,
  validateProductNameSize,
} = require('../middlewares/validateProductNameField');

router.get('/', allProducts);
router.get('/:id', productsById);
router.delete('/:id', deleteProduct);

router.use(validateProductNameField, validateProductNameSize);

router.post('/', newProduct);
router.put('/:id', updateProduct);

module.exports = router;
