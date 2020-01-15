const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const Response = require("../../helpers");
const User = require("../models/User");

const signup = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  User.findOne({ email: email }).then(user => {
    if (user) return Response(res, { message: "User already exists." }, 400);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("JwtSecret"),
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                  password: user.password
                }
              });
            }
          );
        });
      });
    });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  // Simple validation for now...
  if (!email || !password) {
    return Response(res, { message: "Please enter all fields." }, 400);
  }

  User.findOne({ email: email }).then(user => {
    if (!user) return Response(res, { message: "User does not exists." }, 400);

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return Response(res, { message: "Invalid credentials." }, 400);
      jwt.sign(
        { id: user.id },
        config.get("JwtSecret"),
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              password: user.password
            }
          });
        }
      );
    });
  });
};

module.exports = {
  signup,
  login
};
