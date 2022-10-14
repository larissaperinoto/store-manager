const { salesProductsService } = require('../services');

const salesProductsById = async (req, res) => {
  const { id } = req.params;
  const response = await salesProductsService.requestSaleById(Number(id));

  if (response.message) {
    res.status(404).json(response);
  } else {
    res.status(200).json(response);
  }
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const salesProducts = req.body;

  const updateResponse = await salesProductsService.updateSale(Number(id), salesProducts);

  if (updateResponse.message) {
    res.status(404).json(updateResponse);
  } else {
    const itemsUpdated = updateResponse.map(({ productId, quantity }) => ({ productId, quantity }));
    return res.status(200).json({ saleId: id, itemsUpdated });
  }
};

module.exports = {
  salesProductsById,
  updateSale,
};
