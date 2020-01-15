const { validationResult } = require("express-validator");
const Response = require("../helpers");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  const extractedErrors = [];

  if (errors.isEmpty()) return next();

  errors
    .array()
    .map(error => extractedErrors.push({ [error.param]: error.msg }));

  return Response(res, { errors: extractedErrors }, 400);
};

module.exports = validate;
