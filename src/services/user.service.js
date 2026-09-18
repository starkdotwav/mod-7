import { User, Order, sequelize } from '../models/index.js';

export const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] }
  });
  return users;
};

export const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] }
  });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
};

export const createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

export const updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  await user.update(userData);
  return user;
};

export const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  await user.destroy();
  return { message: 'Usuario eliminado correctamente' };
};

export const getUserWithOrders = async (id) => {
  const user = await User.findByPk(id, {
    include: [{ model: Order, as: 'orders' }],
    attributes: { exclude: ['password'] }
  });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
};

export const createUserWithOrder = async (userData, orderData) => {
  const transaction = await sequelize.transaction();
  try {
    const user = await User.create(userData, { transaction });
    const order = await Order.create(
      { ...orderData, userId: user.id },
      { transaction }
    );
    await transaction.commit();
    return { user, order };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
