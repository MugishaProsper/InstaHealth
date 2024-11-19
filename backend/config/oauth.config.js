import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/user.models.js';

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : '/api/auth/google/callback'
  },
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ providerId : profile.id, profile : 'google' });
    if(!user){
      user = await User.create({
        name : profile.displayName,
        email : profile.emails[0].value,
        profile : 'google',
        providerId : profile.id
      });
    }
    return done(null, user);
  } catch (error) {
    return done(error, null)
  }
})
);
