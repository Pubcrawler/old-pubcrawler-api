import { Router } from 'express';
import { version } from '../../package.json';

export default () => {
  const api = Router();

  api.get('/version', (req, res) => {
    res.json({ version });
  });

  return api;
};
