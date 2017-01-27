import { Router } from 'express';
import _ from 'lodash';

import { version } from '../../package.json';
import User from '../db/models/user';

export default () => {
  const api = Router();

  function ensureAuthenticated(req, res, next) {
    if (req.user && req.isAuthenticated()) return next();
    return res.sendStatus(401);
  }

  api.get('/version', (req, res) => {
    res.json({ version });
  });

  api.get('/me', ensureAuthenticated, (req, res) => {
    const query = User.findOne({ id: req.user.id }).exec();
    query.then((queriedUser) => {
      res.json(_.pick(queriedUser, ['name', 'picture', 'updated', 'created']));
    }).catch(() => {
      res.sendStatus(404);
    });
  });

  return api;
};
