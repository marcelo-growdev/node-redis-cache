import Sequelize from 'sequelize';
import dataBaseConfig from '../config/database';

import User from '../app/models/User';
import Product from '../app/models/Product';

const models = [User, Product];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      );
  }
}

export default new DataBase();
