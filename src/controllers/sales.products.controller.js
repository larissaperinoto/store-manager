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

module.exports = {
  salesProductsById,
};
