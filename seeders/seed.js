import { User, Order, sequelize } from '../src/models/index.js';

const seedData = async () => {
  try {
    console.log('Sincronizando base de datos...');
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate([
      { nombre: 'Juan Pérez', email: 'juan@example.com', password: '123456' },
      { nombre: 'María González', email: 'maria@example.com', password: 'abc123' },
      { nombre: 'Carlos López', email: 'carlos@example.com', password: 'xyz789' }
    ]);

    await Order.bulkCreate([
      { userId: users[0].id, producto: 'Laptop', cantidad: 1, total: 999.99 },
      { userId: users[0].id, producto: 'Mouse', cantidad: 2, total: 49.98 },
      { userId: users[1].id, producto: 'Teclado', cantidad: 1, total: 79.99 },
      { userId: users[2].id, producto: 'Monitor', cantidad: 1, total: 299.99 }
    ]);

    console.log('Datos de prueba insertados correctamente.');
    await sequelize.close();
  } catch (error) {
    console.error('Error al insertar datos:', error);
    process.exitCode = 1;
  }
};

seedData();
