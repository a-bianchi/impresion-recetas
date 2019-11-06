import mongoose from 'mongoose';
import dbm from '../local_config/configs';

const connect = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(dbm.connect, {
    useNewUrlParser: true,
    useCreateIndex: true
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log('connection db success');
  });

  return db;
};

export default connect;
