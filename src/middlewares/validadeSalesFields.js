const validateProductIdField = (req, res, next) => {
  const productIdFiel = req.body.every((product) => product.productId);
  if (!productIdFiel) return res.status(400).json({ message: '"productId" is required' });

  return next();
};

const validateQuantityField = (req, res, next) => {
  const quantityFiel = req.body
    .every((product) => product.quantity || Number(product.quantity) === 0);
  if (!quantityFiel) return res.status(400).json({ message: '"quantity" is required' });

  return next();
};

const validateQuantityNumber = (req, res, next) => {
  const quantityFielNumber = req.body.every((product) => Number(product.quantity) > 0);
  if (!quantityFielNumber) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  return next();
};

module.exports = {
  validateProductIdField,
  validateQuantityField,
  validateQuantityNumber,
};
