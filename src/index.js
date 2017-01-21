import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import config from './config.json';

const app = express();

app.server = http.createServer(app);

app.use(cors({
  exposedHeaders: config.corsHeaders,
}));


app.use(bodyParser.json({
  limit: config.bodyLimit,
}));


export default app;
