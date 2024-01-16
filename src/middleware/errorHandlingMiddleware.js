const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500

  const errorResponse = {
    status: 'error',
    error: {
      code: statusCode,
      message: err.message || 'Erro interno do servidor.'
    }
  }

  if (err.details) {
    errorResponse.error.details = err.details
  }
  
  delete errorResponse.error.stack;

  res.status(statusCode).json(errorResponse)
}

module.exports = errorMiddleware