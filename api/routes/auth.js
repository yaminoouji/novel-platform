const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrpyt = require("bcryptjs");
const prismaInstance = require("../prisma.js");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.json({ success: false, error: "Bad input." });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      delete user.password;

      jwt.sign(
        { username: user.username, id: user.id },
        process.env.JWT_SECRET,
        (err, token) => {
          if (err) {
            return res.json({ success: false });
          }

          return res.json({ success: true, user, token });
        }
      );
    });
  })(req, res);
});

router.post("/register", [
  body("username").isLength({ min: 4, max: 48 }).trim().escape(),
  body("email").isEmail(),
  body(
    "password",
    "Password should be at least 8 characters long and must contain at least 1 number, 1 uppercase letter and a symbol."
  ).isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ success: false, error: errors.array() });
    }

    const user = {
      username: req.body.username,
      email: req.body.email,
      password: bcrpyt.hashSync(req.body.password, 10),
      registrationDate: new Date(),
      coins: 0,
      stones: 0,
    };

    const createdUser = await prismaInstance.user.create({ data: user });

    jwt.sign(
      { username: req.body.username },
      process.env.JWT_SECRET,
      (err, token) => {
        if (err) {
          next(err);
        }

        delete createdUser.password;

        return res.json({ success: true, user: createdUser, token });
      }
    );
  },
]);

module.exports = router;
