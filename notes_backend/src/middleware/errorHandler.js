module.exports = function errorHandler(err, req, res, next) {
  // Basic error logging
  console.error(`[ERROR] ${req.method} ${req.originalUrl}`, {
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });

  // If headers already sent, delegate to default express
  if (res.headersSent) {
    return next(err);
  }

  // Structured error response
  return res.status(err.status || 500).json({
    error: err.publicMessage || 'Internal Server Error',
  });
};
