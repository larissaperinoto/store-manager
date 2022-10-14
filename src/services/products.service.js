const { productsModel } = require('../models');

const requestProducts = async () => {
  const response = await productsModel.findAll();
  return response;
};

const requestProductById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (product) return product;

  return { message: 'Product not found' };
};

const registerProduct = async (product) => {
  const response = await productsModel.insert(product);
  return { id: response.insertId, name: product.name };
};

const updateProduct = async (productName, productId) => {
  const productExists = await requestProductById(productId);

  if (productExists.message) return productExists;

  const updateResponse = await productsModel.update(productName, productId);

  return updateResponse;
};

const deleteProduct = async (productId) => {
  const productExists = await requestProductById(productId);

  if (productExists.message) return productExists;

  await productsModel.deleta(productId);
};

const requestProductByName = async (productName) => {
  const product = await productsModel.findByName(productName);

  if (product) return product;

  return { message: 'Product not found' };
};

module.exports = {
  requestProducts,
  requestProductById,
  registerProduct,
  updateProduct,
  deleteProduct,
  requestProductByName,
};
