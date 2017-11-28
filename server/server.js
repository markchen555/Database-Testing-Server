const express = require('express');
const path = require('path');
const morgan = require('morgan');
const parse = require('body-parser');

// Database


// Router


// Port
const PORT = 3005;
const app = express();

app.listen(PORT, function() {
  console.log(`It's listening to port: ${PORT}`)
})