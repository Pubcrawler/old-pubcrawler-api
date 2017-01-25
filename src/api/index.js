import { Router } from 'express';
import { version } from '../../package.json';

import User from '../db/models/user';

export default () => {
  const api = Router();

  function ensureAuthenticated(req, res, next) {
    if (req.user && req.isAuthenticated()) return next();
    res.sendStatus(401);
  }

  api.get('/version', (req, res) => {
    res.json({ version });
  });

  api.get('/me', ensureAuthenticated, (req, res) => {
    const query = User.findOne({ id: req.user.id }).exec();
    query.then((queriedUser) => {
      res.json({
        name: queriedUser.name,
        picture: queriedUser.picture,
        updated: queriedUser.updated,
        created: queriedUser.created,
      })
    }).catch((error) => {
      res.json({ error: error });
    });
  });

  return api;
};
