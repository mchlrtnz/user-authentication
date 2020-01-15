const Response = (res, payload, statusCode = 200) =>
  res.status(statusCode).json({ ...payload });

module.exports = Response;
