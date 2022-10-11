const { productsModel } = require('../models');

const requestProducts = async () => {
  const response = await productsModel.findAll();
  return response;
};

const requestProductsById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (product) return product;
  return { message: 'Product not found' };
};

const registerProduct = async (product) => {
  const response = await productsModel.insert(product);
  return { id: response.insertId, name: product.name };
};

module.exports = {
  requestProducts,
  requestProductsById,
  registerProduct,
};
