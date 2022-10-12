const { salesProductsModel, salesModel } = require('../models');

const registerSalesProducts = async (salesProducts, saleId) => {
  const response = await salesProductsModel.insert(salesProducts, saleId);
  return response;
};

const requestSaleById = async (saleId) => {
  const saleExists = await salesModel.findById(saleId);
  console.log(saleExists[0], 'service');
  if (saleExists.length === 0) return { message: 'Sale not found' };

  const sales = await salesProductsModel.findById(saleId);
  return sales;
};

module.exports = {
  registerSalesProducts,
  requestSaleById,
};