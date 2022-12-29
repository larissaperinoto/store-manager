const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('../swagger.json');
const app = require('./app');
require('dotenv').config();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
