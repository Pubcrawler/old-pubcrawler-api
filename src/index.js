import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import winston from 'winston';

import api from './api';
import config from './config.json';
import middleware from './middleware';

const app = express();

app.server = http.createServer(app);

app.use(cors({
  exposedHeaders: config.corsHeaders,
}));


app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

app.use(middleware());

app.use('/api', api());

app.server.listen(process.env.PORT || config.port);

winston.info(`Server started on ${app.server.address().port}`);

export default app;
