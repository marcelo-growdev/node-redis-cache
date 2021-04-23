import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';
import User from '../models/User';

class AuthController {
  async store(req, res) {
    try {
      const { login, password } = req.body;
      const user = await User.findOne({
        where: { login },
        attributes: ['uid', 'login', 'enable', 'password_hash'],
      });

      if (!user) {
        throw Error('User not found');
      }

      if (!(await user.checkPassword(password))) {
        throw Error('User not found');
      }

      const userJson = user.toJSON();
      delete userJson.password_hash;

      return res.status(200).json({
        user: userJson,
        access_token: jwt.sign(
          {
            user_uid: user.uid,
          },
          authConfig.secret,
          {
            expiresIn: authConfig.expiresIn,
          },
        ),
      });
    } catch (error) {
      return res.status(401).json({ msg: error.message ? error.message : error });
    }
  }

  async show(req, res) {
    try {
      const { token } = req.params;

      const decoded = await promisify(jwt.verify)(token, authConfig.secret);

      const user = await User.findOne({
        where: { uid: decoded.user_uid },
        attributes: ['uid', 'login', 'enable'],
      });

      if (!user) {
        throw Error('User not exists.');
      }

      const userJson = user.toJSON();
      delete userJson.password_hash;

      return res.status(200).json({
        user: userJson,
      });
    } catch (error) {
      return res.status(404).json({ msg: error.message ? error.message : error });
    }
  }
}

export default new AuthController();
