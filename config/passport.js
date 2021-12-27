const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("../models/users");
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      //   console.log(accessToken);
      //   console.log(profile);
      const newUser = {
        googleID: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
      };

      try {
        let user = await User.findOne({ googleID: profile.id });

        if (user) {
          const token = await user.generateAuthToken();
          done(null, user);
        } else {
          user = await User.create(newUser);
          const token = await user.generateAuthToken();
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: "/api/auth/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       User.findOrCreate({ facebookID: profile.id }, function (err, user) {
//         if (err) {
//           return done(err);
//         }
//         done(null, user);
//       });
//     }
//   )
// );

// passport.use(
//   new TwitterStrategy(
//     {
//       consumerKey: process.env.TWITTER_CONSUMER_KEY,
//       consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
//       callbackURL: "/api/auth/twitter/callback",
//     },
//     async (token, tokenSecret, profile, done) => {
//       console.log(profile);
// const newUser = {
//   googleID: profile.id,
//   displayName: profile.displayName,
//   firstName: profile.name.givenName,
//   lastName: profile.name.familyName,
//   email: profile.emails[0].value,
//   avatar: profile.photos[0].value,
// };

// try {
//   let user = await User.findOne({ googleID: profile.id });

//   if (user) {
//     const token = await user.generateAuthToken();
//     done(null, user);
//   } else {
//     user = await User.create(newUser);
//     const token = await user.generateAuthToken();
//     done(null, user);
//   }
// } catch (err) {
//   console.error(err);
// }
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

module.exports = passport;
