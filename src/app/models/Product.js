import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        title: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.STRING, allowNull: false },
        price: { type: Sequelize.DECIMAL, allowNull: false },
        enable: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        scopes: {
          enable: {
            where: {
              enable: true,
            },
          },
          default: {
            where: {
              enable: [true, false],
            },
          },
        },
      }
    );

    this.removeAttribute('id');

    return this;
  }
}

export default Product;
