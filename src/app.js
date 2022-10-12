const express = require('express');

const app = express();
app.use(express.json());
const { productsRoutes, salesRoutes } = require('./routes');

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;