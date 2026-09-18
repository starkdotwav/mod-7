import { User } from './src/models/index.js';
import sequelize from './src/config/database.js';

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate([
      { nombre: 'Juan Pérez', email: 'juan@example.com', password: '123456' },
      { nombre: 'María González', email: 'maria@example.com', password: 'abc123' },
      { nombre: 'Carlos López', email: 'carlos@example.com', password: 'xyz789' }
    ]);

    console.log('Datos de prueba insertados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('Error al insertar datos:', error);
    process.exit(1);
  }
};

seedData();
