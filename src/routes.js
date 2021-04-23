import { Router } from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerDocumentation from './swagger_documentation.json';

import authMiddleware from './app/middlewares/auth';

import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';
import ProductController from './app/controllers/ProductController';

const routes = Router();

routes.use(cors());

routes.get('/', (req, res) => res.json('NODE-REDIS-CACHE'));

routes.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

routes.post(
  '/users',
  UserController.store,
  // #swagger.tags = ['users']
  // #swagger.description = 'Route store user.'
  /* #swagger.parameters['user'] = {
    in: 'body',
    description: 'Parameters store user.',
    required: true,
    type: 'object',
    schema: {
      login: 'E-mail',
      password: 'Password account',
    }
  } */
);

routes.post(
  '/login',
  AuthController.store,
  // #swagger.tags = ['auth']
  // #swagger.description = 'Route used to login.'
  /* #swagger.parameters['auth'] = {
    in: 'body',
    description: 'Parameters for logging in.',
    required: true,
    type: 'object',
    schema: {
      login: 'E-mail',
      password: 'Password account',
    }
  } */
);

routes.get(
  '/products',
  ProductController.index,
  // #swagger.tags = ['products']
  // #swagger.description = 'Route get products.'
);

routes.use(authMiddleware);

routes.post(
  '/products',
  ProductController.store,
  // #swagger.tags = ['products']
  // #swagger.description = 'Route used to login.'
  // #swagger.security = [{Bearer: []}]
  /* #swagger.parameters['product'] = {
    in: 'body',
    description: 'Parameters for store product.',
    required: true,
    type: 'object',
    schema: {
      title: 'Title product',
      description: 'Descricption product',
      price: '10.00'
    }
  } */
);

export default routes;
