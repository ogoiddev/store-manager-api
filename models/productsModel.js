const connection = require('../server/connection');

const getAll = async () => { 
  const query = 'SELECT * FROM heroku_241bb786a0eda69.products;';
  const [data] = await connection.query(query);
  return data;
};

const getById = async (id) => { 
  const query = 'SELECT * FROM heroku_241bb786a0eda69.products WHERE id = ?;';
  const [data] = await connection.query(query, [id]);
  return data;
};

const getByName = async (name) => {
  const query = `SELECT *
                  FROM heroku_241bb786a0eda69.products
                  WHERE LOCATE(?, products.name);`;
  const [data] = await connection.query(query, [name]);  
  return data;
};

const addProduct = async (product) => { 
  const query = 'INSERT INTO heroku_241bb786a0eda69.products (name) VALUES (?);';
  const [data] = await connection.query(query, [product]);
  return data;
};

const updateProductName = async (productId, name) => { 
  const query = 'UPDATE heroku_241bb786a0eda69.products SET name = ? WHERE id = ?;';
  await connection.query(query, [name, productId]);
};

const deleteProduct = async (productId) => { 
  const query = 'DELETE FROM heroku_241bb786a0eda69.products WHERE id = ?;';
  await connection.query(query, [productId]);
};

module.exports = {
  getAll,
  getById,
  getByName,
  addProduct,
  updateProductName,
  deleteProduct,
};
