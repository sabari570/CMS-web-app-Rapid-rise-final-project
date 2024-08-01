const passport = require("passport");
const crypto = require("crypto");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

// Converting googleId to mongoose Object id
const googleIdToObjectId = (googleId) => {
  console.log({ googleId });
  // Creating a hash from the googleId
  const hash = crypto.createHash("sha1").update(googleId).digest("hex");
  console.log("Hash: ", hash);

  //   Taking the first 24 characters of the hash to create a valid object
  const objectIdStr = hash.substring(0, 24);
  return new mongoose.Types.ObjectId(objectIdStr);
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        console.log("User profile: ", profile);
        const googleObjectId = googleIdToObjectId(profile.id);
        const firstName = profile.displayName;
        const email = profile.emails[0]?.value;
        const profilePic = profile.photos[0]?.value;
        const provider = profile.provider;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            _id: googleObjectId,
            firstName,
            email,
            profilePic,
            provider,
          });
        }
        return done(null, user);
      } catch (error) {
        console.log("Error while signing in with google: ", error);
        return done(error, null);
      }
    }
  )
);

// Since we are using sessions we need to serialize and deserialize the users
// we use this to pass our sessions
passport.serializeUser((user, done) => {
  console.log("Serialize user:", user);
  done(null, user._id);
});

passport.deserializeUser((user, done) => {
  console.log("deserialize user:", user);
  done(null, user);
});
