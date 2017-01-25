import { Router } from 'express';
import { version } from '../../package.json';

// TODO: Implement mechanism to detect loggedIn users which yields profile data in /me endpoint.

export default () => {
  const api = Router();

  api.get('/version', (req, res) => {
    res.json({ version });
  });

  api.get('/me', (req, res) => {
    res.json({ status: 'not implemented' });
  });

  return api;
};
