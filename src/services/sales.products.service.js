const { salesProductsModel, salesModel } = require('../models');
const { requestProductById } = require('./products.service');

const registerSalesProducts = async (salesProducts, saleId) => {
  await salesProductsModel.insert(salesProducts, saleId);
};

const requestSaleById = async (saleId) => {
  const saleExists = await salesModel.findById(saleId);

  if (saleExists.length === 0) return { message: 'Sale not found' };

  const sales = await salesProductsModel.findById(saleId);

  return sales;
};

const updateSale = async (saleId, salesProducts) => {
  const saleExists = await requestSaleById(saleId);
  if (saleExists.message) return saleExists;

  const searchProducts = salesProducts
    .map(({ productId }) => requestProductById(productId));

  const productsExists = await Promise.all(searchProducts);

  if (productsExists.some((product) => product.message)) return { message: 'Product not found' };

  await salesProductsModel.update(saleId, salesProducts);

  const saleUpdated = await salesProductsModel.findyProductBySaleId(saleId);
  console.log(saleUpdated);
  return saleUpdated;
};

module.exports = {
  registerSalesProducts,
  requestSaleById,
  updateSale,
};