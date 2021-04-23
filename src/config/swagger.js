require('dotenv').config();

const host = process.env.API_URL;

const product = require('../app/documentation/product');
const user = require('../app/documentation/user');

module.exports = {
  info: {
    version: '1.0.0',
    title: 'Automatic Documentation API',
    description: 'Automatic Documentation API with Swagger',
  },
  host,
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  defaultModelsExpandDepth: -1,
  securityDefinitions: {
    Bearer: {
      description: 'JWT token using Bearer Token',
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
  },
  definitions: {
    user,
    product,
  },
};
