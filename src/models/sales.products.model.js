const snakeize = require('snakeize');
const camelize = require('camelize');
const connection = require('./db/connection');

const insert = async (salesProducts, saleId) => {
  const columns = Object.keys(snakeize(salesProducts[0])).map((key) => `${key}`).join(', ');

  const placeholders = Object.keys(salesProducts[0]).map((_key) => '?').join(', ');

  const responses = [];

  salesProducts.forEach(async (product) => {
   const responseInsertion = await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, ${columns}) VALUE (?, ${placeholders})`,
     [saleId, ...Object.values(product)],
   );
    responses.push(responseInsertion);
  });

  return responses;
};

const findById = async (saleId) => {
  console.log(saleId);
  const response = await connection.execute(
    `Select a.date, b.product_id, b.quantity
      FROM StoreManager.sales AS a
      INNER JOIN StoreManager.sales_products AS b on a.id = b.sale_id
      WHERE b.sale_id = ?`,
    [saleId],
  );

  return camelize(response[0]);
};

module.exports = {
  insert,
  findById,
};
