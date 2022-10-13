const { salesProductsModel, salesModel } = require('../models');

const registerSalesProducts = async (salesProducts, saleId) => {
  await salesProductsModel.insert(salesProducts, saleId);
};

const requestSaleById = async (saleId) => {
  const saleExists = await salesModel.findById(saleId);

  if (saleExists.length === 0) return { message: 'Sale not found' };

  const sales = await salesProductsModel.findById(saleId);

  return sales;
};

module.exports = {
  registerSalesProducts,
  requestSaleById,
};