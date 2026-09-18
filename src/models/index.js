import sequelize from '../config/database.js';
import User from './User.js';
import Order from './Order.js';

User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { sequelize, User, Order };
