const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
const prismaInstance = require("./prisma.js");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, cb) => {
      const user = await prismaInstance.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return cb(null, false, { message: "Incorrect email or password" });
      }

      bcrypt.compare(password, user.password, (err, success) => {
        if (err) {
          return cb(err);
        }

        if (!success) {
          return cb(null, false, { message: "Incorrect email or password" });
        }

        return cb(null, user, { message: "Logged in successfully" });
      });
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, cb) => {
      const user = await prismaInstance.user.findUnique({
        where: {
          id: jwtPayload.id,
        },
        select: {
          id: true,
          username: true,
        },
      });

      return cb(null, user);
    }
  )
);
