const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err.message);

  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(status).json({
    status: 'error',
    message,
    data: {}
  });
};

export default errorMiddleware;
