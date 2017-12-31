// disable eslint
/* eslint-disable no-console*/

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const parse = require('body-parser');

// Database


// Router


// Port
const PORT = process.env.PORT || 3005;
const app = express();

app.listen(PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
        It's listening to port: ${PORT}
        ---
        Running on ${process.env.NODE_ENV}
        ---
    `);
  }
});
