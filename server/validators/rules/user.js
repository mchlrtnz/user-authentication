const { body } = require("express-validator");

const signupRules = () => [
  body("firstname")
    .not()
    .isEmpty()
    .withMessage("First name is required."),
  body("lastname")
    .not()
    .isEmpty()
    .withMessage("Last name is required."),
  body("email")
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address provided."),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must not be less than 6 characters")
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.confirm_password) {
        throw new Error("Password confirmation does not match password.");
      }
      return true;
    })
];

const loginRules = () => [
  body("email")
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address provided."),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required.")
];

module.exports = {
  signupRules,
  loginRules
};
