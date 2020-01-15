const router = require("express").Router();
const Response = require("../helpers");
const validate = require("../validators");
const { signupRules, loginRules } = require("../validators/rules/user");
const { signup, login } = require("../database/controllers/user");

router.get("/", (req, res, next) => {
  Response(res, { message: "Hey what you doing here?" }, 200);
});

router.post("/signup", signupRules(), validate, signup);

router.post("/login", loginRules(), validate, login);

module.exports = router;
