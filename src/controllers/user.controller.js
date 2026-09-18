import * as userService from '../services/user.service.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
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
    const user = await userService.createUser(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Usuario creado correctamente',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({
      status: 'success',
      message: 'Usuario actualizado correctamente',
      data: { user }
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
    const result = await userService.createUserWithOrder(userData, orderData);
    res.status(201).json({
      status: 'success',
      message: 'Usuario y orden creados correctamente con transacció´´´n',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
