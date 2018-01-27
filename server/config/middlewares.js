const morgan = require('morgan');
const parse = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

module.exports = app => {
  if (isProd) {
    app.use(compression());
    app.use(helmet());
  }
  app.use(parse.json());
  app.use(parse.urlencoded({ extended: true }));
  if (isDev) {
    app.use(morgan('dev'));
  }
};
