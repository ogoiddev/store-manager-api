const connection = require('../server/connection');

const addSale = async (sale) => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (CURRENT_TIMESTAMP);';
  const [data] = await connection.query(query, [sale]);
  return data;
};

const addSaleProduct = async (saleId, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products 
                (sale_id, product_id, quantity) VALUES (?, ?, ?);`;
  await connection.query(query, [saleId, productId, quantity]);
};

const getAll = async () => {
  const query = `SELECT sale_id as saleId, 
                        product_id as productId,
                        quantity,
                        date
                  FROM StoreManager.sales_products
                    JOIN StoreManager.sales
                    ON StoreManager.sales.id = StoreManager.sales_products.sale_id;`;
  const [data] = await connection.query(query);
  return data;
};

const getById = async (saleId) => { 
  const query = `SELECT date, product_id  as productId, quantity FROM
                  (SELECT id, date, product_id, quantity
                    FROM StoreManager.sales_products
                      JOIN StoreManager.sales
                      ON sales_products.sale_id = sales.id
                      HAVING sales.id = ?
                    ORDER BY id, product_id) as list;`;
  const [data] = await connection.query(query, [saleId]);
  return data;
};

const updateSale = async (productId, quantity, saleId) => {
  const query = `UPDATE StoreManager.sales_products as product
                  SET product.quantity = ?
                  WHERE product.sale_id = ? AND product.product_id = ?;`;
  await connection.query(query, [quantity, saleId, productId]);
};

const deleteSale = async (saleId) => { 
  const query = `DELETE product, sale
                  FROM StoreManager.sales_products as product, StoreManager.sales as sale
                  WHERE sale.id = ?
                  AND product.sale_id = ?;`;
  await connection.query(query, [saleId, saleId]);
};

module.exports = { addSale, addSaleProduct, getAll, getById, deleteSale, updateSale };