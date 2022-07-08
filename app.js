const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');
const error = require('./middleware/errorMiddleware');
const connection = require('./server/connection');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/db', async (_req, res) => {
    try {
      const result = await connection.query('SELECT * FROM heroku_241bb786a0eda69');
      const results = { results: (result) ? result.rows : null };
      res.render('pages/db', results);
      connection.release();
    } catch (err) {
      res.send(`Error ${err}`);
    }
  });

app.use(bodyParser.json());

app.use(productsRouter);
app.use(salesRouter);

app.use(helmet());

app.use(error);

app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;