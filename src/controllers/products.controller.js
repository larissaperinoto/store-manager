const { productsService } = require('../services');

const allProducts = async (_req, res) => {
  const response = await productsService.requestProducts();

  res.status(200).json(response);
};

const productsById = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.requestProductById(Number(id));

  if (response.message) {
    res.status(404).json(response);
  } else {
    res.status(200).json(response);
  }
};

const newProduct = async (req, res) => {
  const response = await productsService.registerProduct(req.body);

  return res.status(201).json(response);
};

module.exports = {
  allProducts,
  productsById,
  newProduct,
};
