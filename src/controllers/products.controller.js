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

const updateProduct = async (req, res) => {
  const productId = Number(req.params.id);
  const productName = req.body.name;

  const response = await productsService.updateProduct(productName, productId);

  if (response.message) {
    res.status(404).json(response);
  } else {
    res.status(200).json(response);
  }
};

const deleteProduct = async (req, res) => {
  const productId = Number(req.params.id);

  const response = await productsService.deleteProduct(productId);

  if (response) {
    res.status(404).json(response);
  } else {
    res.sendStatus(204);
  }
};

module.exports = {
  allProducts,
  productsById,
  newProduct,
  updateProduct,
  deleteProduct,
};
