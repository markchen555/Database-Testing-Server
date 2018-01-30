// disable eslint
/* eslint-disable no-console*/

// const express = require('express');
// const constants = require('./config/constants');
// const path = require('path');

import express from 'express';
import constants from './config/constants';
import '../db/db';
import middlewaresConfig from './config/middlewares';
import apiRoutes from './router';

// Initial exprss server
const app = express();

// Middlewares
// const middlewaresConfig = require('./config/middlewares');
middlewaresConfig(app);

// Router
// const apiRoutes = require('./router/index');

// Database
// require('../db/db');
console.log('=======================================================');
console.log(constants);
console.log('=======================================================');

// Router
app.get('/', (req, res) => {
  res.send('Hello World!');
});

apiRoutes(app);

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
