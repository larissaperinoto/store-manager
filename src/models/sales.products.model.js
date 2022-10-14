const snakeize = require('snakeize');
const camelize = require('camelize');
const connection = require('./db/connection');

const insert = async (salesProducts, saleId) => {
  const columns = Object.keys(snakeize(salesProducts[0])).map((key) => `${key}`).join(', ');

  const placeholders = Object.keys(salesProducts[0]).map((_key) => '?').join(', ');

  salesProducts.forEach(async (product) => {
   await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, ${columns}) VALUE (?, ${placeholders})`,
     [saleId, ...Object.values(product)],
     );
  });
};

const findById = async (saleId) => {
  const response = await connection.execute(
    `Select a.date, b.product_id, b.quantity
      FROM StoreManager.sales AS a
      INNER JOIN StoreManager.sales_products AS b on a.id = b.sale_id
      WHERE b.sale_id = ?`,
    [saleId],
  );
  return camelize(response[0]);
};

const update = async (saleId, salesProducts) => {
  const promise = salesProducts.map(({ productId, quantity }) => connection.execute(
      `UPDATE StoreManager.sales_products
      SET quantity = ? WHERE product_id = ? AND sale_id = ?`,
      [quantity, productId, saleId],
   ));
  await Promise.all(promise);
};

const findyProductBySaleId = async (saleId) => {
  const response = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?',
    [saleId],
  );
  return camelize(response[0]);
};

module.exports = {
  insert,
  findById,
  update,
  findyProductBySaleId,
};
