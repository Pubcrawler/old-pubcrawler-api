import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  gender: String,
  picture: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

User.plugin(passportLocalMongoose);

export default mongoose.model('User', User);
