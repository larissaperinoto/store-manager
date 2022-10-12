const snakeize = require('snakeize');
const connection = require('./db/connection');

const findAll = async () => {
  const response = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return response[0];
};

const findById = async (productId) => {
  const response = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );

  return response[0][0];
};

const insert = async (product) => {
  const columns = Object.keys(snakeize(product)).map((key) => `${key}`).join(', ');

  const placeholders = Object.keys(product).map((_key) => '?').join(', ');

  const response = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
    [...Object.values(product)],
  );

  return { insertId: response[0].insertId };
};

module.exports = {
  findAll,
  findById,
  insert,
};
