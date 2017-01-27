import http from 'http';
import path from 'path';
import process from 'process';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import winston from 'winston';
import yamlConfig from 'node-yaml-config';
import passport from 'passport';

import db from './db';
import api from './api';
import facebook from './auth/facebook';
import middleware from './middleware';


const config = yamlConfig.load(path.join(__dirname, '/config.yml'));

winston.log('info', config);

const app = express();

const sessionOptions = {
  secret: config.values.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {},
};

if (app.get('env') === 'production') {
  sessionOptions.cookie.secure = true;
}

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

app.server = http.createServer(app);

app.use(cors({
  exposedHeaders: config.values.corsHeaders,
}));


app.use(bodyParser.json({
  limit: config.values.bodyLimit,
}));

db(config);

app.use(middleware());

app.use('/api', api());

app.use('/auth', facebook(config));

app.server.listen(process.env.PORT || config.server.port);

winston.info(`Server started on ${app.server.address().port}`);

export default app;
