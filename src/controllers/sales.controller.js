const { salesService, salesProductsService } = require('../services');

const allSales = async (_req, res) => {
  const sales = await salesService.requestSales();
  res.status(200).json(sales);
};

const insertSale = async (req, res) => {
  const insertSaleId = await salesService.registerSales(req.body);

  if (insertSaleId.message) return res.status(404).json(insertSaleId);

  await salesProductsService.registerSalesProducts(req.body, insertSaleId);
  const response = { id: insertSaleId, itemsSold: req.body };
  res.status(201).json(response);
};

const deleteSale = async (req, res) => {
  const saleId = Number(req.params.id);

  const response = await salesService.deleteSale(saleId);
  console.log(response);
  if (response) {
    res.status(404).json(response);
  } else {
    res.sendStatus(204);
  }
};

module.exports = {
  allSales,
  insertSale,
  deleteSale,
};
