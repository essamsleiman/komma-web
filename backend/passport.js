const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GoogleUser = require("./models/googleuser.model");
const BearerStrategy = require('passport-http-bearer').Strategy;

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
      // console.log("PASSPORTUSER", user)
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
      // console.log("Profile", profile)
      const newUser = {
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        accessToken,
        email: profile.emails[0].value,
      };

      try {
        let user = await GoogleUser.findOne({ googleId: profile.id });
        console.log("accessToken", accessToken)
        if (user) {
          console.log("USER ALREADY IN DB");
          // console.log(`USER: ${user}`);
          done(null, user);
        } else {
          console.log("USER Added TO DB");
          // console.log(`USER: ${user}`);

          user = await GoogleUser.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);


passport.use(new BearerStrategy(
  (token, done) => { // arguments are the token and a done function
  console.log("IN BEARER STRAT ")
  console.log("Bearer Token: ", token)
  // looks for the user via an accessToken key
  // this is given that the User model has an accessToken
  // key in the schema and users are given one by Google
  GoogleUser.find({ accessToken: token }, (err, user) => {
      if (err) {
        console.log("in error")
        return done(null, false);
      }
      
      // if no user is found with that accesstoken, 
      // return the done function with false
      if (!user.length) {
        console.log("in if")

        return done(null, false);
      }
      console.log("in else", user)
      
      // otherwise, return the first user in the user
      // array because the user array should only have 1
      return done(null, user[0]);
    });
  }
));

module.exports = passport;
