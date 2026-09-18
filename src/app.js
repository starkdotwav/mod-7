import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import sequelize from './config/database.js';
import errorMiddleware from './middlewares/error.middleware.js';
import notFoundMiddleware from './middlewares/notFound.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API Módulo 7 - Node.js + Express + Sequelize',
    endpoints: {
      usuarios: '/api/usuarios'
    }
  });
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

sequelize
  .authenticate()
  .then(() => console.log('Conexión a base de datos establecida correctamente.'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));

export default app;
