import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const { count, rows } = await User.findAndCountAll({
        limit,
        offset: (page - 1) * limit,
        attributes: ['uid', 'login', 'enable'],
      });

      const data = { users: rows, total: count, page };

      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ msg: error.message ? error.message : error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;

      const user = await User.findOne({
        where: { uid },
        attributes: ['uid', 'login', 'enable'],
      });

      if (!user) {
        throw Error('User not found.');
      }

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(404).json({ msg: error.message ? error.message : error });
    }
  }

  async store(req, res) {
    const t = await User.sequelize.transaction();
    try {
      const user = await User.create(req.body, { transaction: t });

      await t.commit();

      return res.status(200).json({
        user: { login: user.login },
      });
    } catch (error) {
      await t.rollback();

      return res.status(404).json({ msg: error.message ? error.message : error });
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;

      const [updated] = await User.update(req.body, { where: { uid } });

      if (!updated) {
        throw Error('Update error.');
      }

      return res.status(200).json({ msg: 'DATA_UPDATED' });
    } catch (error) {
      return res.status(404).json({ msg: error.message ? error.message : error });
    }
  }
}

export default new UserController();
