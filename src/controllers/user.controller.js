import * as userService from '../services/user.service.js';

export const getUsers = async (req, res, next) => {
  try {
    const { nombre } = req.query;
    const users = nombre
      ? await userService.searchUsers(nombre)
      : await userService.getAllUsers();

    res.json({
      status: 'success',
      message: 'Usuarios obtenidos correctamente',
      data: { users }
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json({
      status: 'success',
      message: 'Usuario obtenido correctamente',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      const error = new Error('Nombre, email y password son requeridos');
      error.status = 400;
      throw error;
    }

    const user = await userService.createUser({ nombre, email, password });
    const safeUser = user.toJSON ? user.toJSON() : { ...user };
    delete safeUser.password;

    res.status(201).json({
      status: 'success',
      message: 'Usuario creado correctamente',
      data: { user: safeUser }
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { nombre, email } = req.body;
    const updateData = {};

    if (nombre) updateData.nombre = nombre;
    if (email) updateData.email = email;

    if (Object.keys(updateData).length === 0) {
      const error = new Error('Debes enviar nombre o email para actualizar');
      error.status = 400;
      throw error;
    }

    const user = await userService.updateUser(req.params.id, updateData);
    const safeUser = user.toJSON ? user.toJSON() : { ...user };
    delete safeUser.password;

    res.json({
      status: 'success',
      message: 'Usuario actualizado correctamente',
      data: { user: safeUser }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.json({
      status: 'success',
      message: result.message,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

export const getUserWithOrders = async (req, res, next) => {
  try {
    const user = await userService.getUserWithOrders(req.params.id);
    res.json({
      status: 'success',
      message: 'Usuario con órdenes obtenido correctamente',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

export const createUserWithOrder = async (req, res, next) => {
  try {
    const { userData, orderData } = req.body;

    if (!userData?.nombre || !userData?.email || !userData?.password) {
      const error = new Error('Datos de usuario incompletos');
      error.status = 400;
      throw error;
    }

    if (!orderData?.producto || !orderData?.cantidad || !orderData?.total) {
      const error = new Error('Datos de orden incompletos');
      error.status = 400;
      throw error;
    }

    const result = await userService.createUserWithOrder(userData, orderData);
    const safeUser = result.user.toJSON ? result.user.toJSON() : { ...result.user };
    delete safeUser.password;

    res.status(201).json({
      status: 'success',
      message: 'Usuario y orden creados correctamente con transacción',
      data: {
        user: safeUser,
        order: result.order
      }
    });
  } catch (error) {
    next(error);
  }
};
