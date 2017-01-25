import { Router } from 'express';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import winston from 'winston';

import User from '../db/models/user';


export default (config) => {
  const api = Router();

  api.get('/facebook',
    passport.authenticate('facebook'));

  api.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/version' }), (req, res) => {
    res.redirect('/api/me');
  });

  passport.use(new FacebookStrategy({
    clientID: config.facebook.appId,
    clientSecret: config.facebook.secret,
    callbackURL: config.facebook.callbackUrl,
    display: 'popup',
    authType: 'code',
    passReqToCallback: 'true',
    enableProof: true,
    profileFields: ['id', 'displayName', 'gender', 'picture', 'emails'],
  }, (request, accessToken, refreshToken, profile, callback) => {
    const query = User.findOne({ id: profile.id }).exec();
    winston.log('debug', 'facebook-profile:', profile);
    query
      .then((queriedUser) => {
        if (!queriedUser) {
          winston.log('debug', 'user is not registered.');
          const newUser = new User({
            name: profile.displayName,
            id: profile.id,
            gender: profile.gender,
            picture: profile.photos ? profile.photos[0].value : null,
            email: profile.emails ? profile.emails[0] : null,
          });
          newUser.save().then((savedUser) => {
            winston.log('debug', 'user registered successfully');
            return savedUser;
          });
        }
        return queriedUser;
      })
      .then((returnedUser) => {
        winston.log('debug', 'returning user');
        return callback(null, returnedUser);
      })
      .catch((error) => {
        winston.log('error', error);
        return callback(error, null);
      });
  }));

  passport.serializeUser((user, callback) => {
    callback(null, user);
  });

  passport.deserializeUser((obj, callback) => {
    callback(null, obj);
  });

  return api;
};
