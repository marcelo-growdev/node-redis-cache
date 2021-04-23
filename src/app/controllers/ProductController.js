import Product from '../models/Product';
import Cache from '../../lib/Cache';

class ProductController {
  async index(req, res) {
    try {
      const productsCache = await Cache.get('products');
      if (productsCache) {
        return res.status(200).json({ products: JSON.parse(productsCache) });
      }
      const products = await Product.scope('enable').findAll({
        attributes: ['uid', 'title', 'description', 'price'],
      });

      await Cache.set('products', JSON.stringify(products));

      return res.status(200).json({ products });
    } catch (error) {
      return res.status(404).json({ msg: error.message ? error.message : error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;

      const product = await Product.findOne({
        where: { uid },
        attributes: ['uid', 'title', 'description', 'price'],
      });

      if (!product) {
        throw Error('Product not found.');
      }

      return res.status(200).json({ product });
    } catch (error) {
      return res.status(404).json({ msg: error.message ? error.message : error });
    }
  }

  async store(req, res) {
    try {
      const product = await Product.create(req.body);

      return res.status(200).json({ product });
    } catch (error) {
      return res.status(404).json({ msg: error.message ? error.message : error });
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;

      const [updated] = await Product.update(req.body, { where: { uid } });

      if (!updated) {
        throw Error('Update error.');
      }

      return res.status(200).json({ msg: 'DATA_UPDATED' });
    } catch (error) {
      return res.status(404).json({ msg: error.message ? error.message : error });
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;

      const deleted = await Product.destroy({ where: { uid } });

      if (!deleted) {
        throw Error('Delete error');
      }

      return res.status(200).json({ mesg: 'DATA_DELETED' });
    } catch (error) {
      return res.status(404).json({ msg: error.message ? error.message : error });
    }
  }
}

export default new ProductController();
