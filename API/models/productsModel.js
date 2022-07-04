const connection = require('../server/connection');

const getAll = async () => { 
  const query = 'SELECT * FROM StoreManager.products;';
  const [data] = await connection.query(query);
  return data;
};

const getById = async (id) => { 
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [data] = await connection.query(query, [id]);
  return data;
};

const getByName = async (name) => {
  const query = `SELECT *
                  FROM StoreManager.products
                  WHERE LOCATE(?, products.name);`;
  const [data] = await connection.query(query, [name]);  
  return data;
};

const addProduct = async (product) => { 
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?);';
  const [data] = await connection.query(query, [product]);
  return data;
};

const updateProductName = async (productId, name) => { 
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?;';
  await connection.query(query, [name, productId]);
};

const deleteProduct = async (productId) => { 
  const query = 'DELETE FROM StoreManager.products WHERE id = ?;';
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
