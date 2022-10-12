const { salesModel } = require('../models');
const productsService = require('./products.service');

const requestSales = async () => {
  const sales = await salesModel.findAll();
  return sales;
};

const generateSaleDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.toString().split(' ')[4];
  const datFormat = `${year}-${month}-${day} ${hour}`;
  return datFormat.toString();
};

const registerSales = async (sales) => {
  const productsExists = await Promise.all(sales
    .map(({ productId }) => productsService.requestProductById(Number(productId))));

  const message = productsExists.find((product) => product.message);

  if (message) return message;

  const saleDate = generateSaleDate();
  const response = await salesModel.insert(saleDate);
  return response;
};

const requestSaleById = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  if (sale) return sale;
  return { message: 'Sale not found' };
};

module.exports = {
  requestSales,
  registerSales,
  requestSaleById,
};
