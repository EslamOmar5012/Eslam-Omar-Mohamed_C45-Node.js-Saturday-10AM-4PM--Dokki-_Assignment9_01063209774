export const errorRes = (err, req, res, next) => {
  res.status(err.statusCode ?? 500).json({
    status: "error",
    message: err.message,
    stack: err.stack,
  });
};
