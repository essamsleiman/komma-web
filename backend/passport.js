const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GoogleUser = require("./models/googleuser.model");
require("dotenv").config();

passport.serializeUser((user, done) => {
  console.log("IN PASSPORT");

  done(null, user.id);
});

// passport.deserializeUser((id, done) => {
//   GoogleUser.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

passport.deserializeUser((id, done) => {
  GoogleUser.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((e) => {
      done(new Error("Failed to deserialize an user"));
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALL_BACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      console.log("Profile", profile)
      const newUser = {
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
      };

      try {
        let user = await GoogleUser.findOne({ googleId: profile.id });

        if (user) {
          console.log("USER ALREADY IN DB");
          console.log(`USER: ${user}`);
          done(null, user);
        } else {
          console.log("USER Added TO DB");
          console.log(`USER: ${user}`);

          user = await GoogleUser.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

module.exports = passport;
