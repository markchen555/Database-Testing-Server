/* eslint-disable no-console */
const mongoose = require('mongoose');
const constants = require('../server/config/constants');

// Remove the warning with Promise
mongoose.Promise = global.Promise;

// Connecct the db with the url provide
try {
  mongoose.connect(constants.MONGO_URL);
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', err => {
    console.log(err);
  });
