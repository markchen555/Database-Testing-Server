// disable eslint
/* eslint-disable no-console*/

const express = require('express');
const constants = require('./config/constants');
const path = require('path');

// Initial exprss server
const app = express();

// Middlewares
const middlewaresConfig = require('./config/middlewares');
middlewaresConfig(app);

// Database
require('../db/db');
console.log('=======================================================');
console.log(constants);
console.log('=======================================================');

// Router


// Port(Moved to constants file)

app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
        It's listening to port: ${constants.PORT}
        ---
        Running on ${process.env.NODE_ENV}
        ---
    `);
  }
});
