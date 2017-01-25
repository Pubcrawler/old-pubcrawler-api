import mongoose from 'mongoose';
import Promise from 'bluebird';
import winston from 'winston';


export default (config) => {
  const mongodbUri = `mongodb://${config.database.host}:${config.database.port}/${config.database.db}`;

  winston.log(`Connecting to mongodb at: ${mongodbUri}`);
  mongoose.Promise = Promise;
  mongoose.connect(mongodbUri);
};
