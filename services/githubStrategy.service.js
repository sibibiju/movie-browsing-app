const passport = require('passport');
const githubStrategy = require('passport-github2').Strategy;
const githubCredentials = require('../config/githubAuth');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new githubStrategy(githubCredentials,
    (accessToken, refreshToken, profile, done) => {
        //this callback function is fired after getting user profile from /auth route.
        return done(null, profile);
    }
));