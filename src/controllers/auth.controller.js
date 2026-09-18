import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'modulo7_secret';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error('Email y password son requeridos');
      error.status = 400;
      throw error;
    }

    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      const error = new Error('Credenciales inválidas');
      error.status = 401;
      throw error;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const safeUser = user.toJSON ? user.toJSON() : { ...user };
    delete safeUser.password;

    res.status(200).json({
      status: 'success',
      message: 'Login exitoso',
      data: {
        token,
        user: safeUser
      }
    });
  } catch (error) {
    next(error);
  }
};
