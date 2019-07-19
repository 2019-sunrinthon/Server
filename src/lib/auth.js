import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from "../models/User";

passport.use(
  new LocalStrategy((username, password, done) => {
    (async () => {
      const user = await User.findOne({ username, password }, [
        "username",
        "email",
        "phoneNumber",
        "age",
        "name"
      ]);
      if (!user) return false;
      if (!user.verifyPassword(password)) return false;
      return user;
    })().then(user => {
      done(null, user);
    });
  })
);
