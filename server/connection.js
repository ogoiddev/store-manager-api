const { Pool } = require('pg');
require('dotenv').config();
  
  const connection = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE || 'StoreManager',
    connectionString: process.env.DATABASE_URL,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  });

module.exports = connection;
  
// const mysql = require('mysql2/promise');
// require('dotenv').config(); // não se esqueça de configurar suas variáveis de ambiente aqui na configuração

//   const connection = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE || 'StoreManager',
//   });