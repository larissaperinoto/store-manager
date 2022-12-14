const camelize = require('camelize');
const connection = require('./db/connection');

const findAll = async () => {
  const response = await connection.execute(
    `Select b.sale_id, a.date, b.product_id, b.quantity
    FROM StoreManager.sales AS a
    INNER JOIN StoreManager.sales_products AS b on a.id = b.sale_id;`,
  );

  return camelize(response[0]);
};

const insert = async (saleDate) => {
  const response = await connection.execute(
    `INSERT INTO StoreManager.sales (date) VALUE ('${saleDate}')`,
  );

  return response[0].insertId;
};

const findById = async (saleId) => {
  const response = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );

  return response[0];
};

const deleta = async (saleId) => {
  await connection.execute(
    `DELETE FROM StoreManager.sales WHERE id = ${saleId}`,
  );

  await connection.execute(
    `DELETE FROM StoreManager.sales_products WHERE sale_id = ${saleId}`,
  );
};

module.exports = {
  findAll,
  insert,
  findById,
  deleta,
};
