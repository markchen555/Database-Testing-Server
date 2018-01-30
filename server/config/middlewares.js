// ES5
// const morgan = require('morgan');
// const parse = require('body-parser');
// const compression = require('compression');
// const helmet = require('helmet');

// const isDev = process.env.NODE_ENV === 'development';
// const isProd = process.env.NODE_ENV === 'production';

// module.exports = app => {
//   if (isProd) {
//     app.use(compression());
//     app.use(helmet());
//   }
//   app.use(parse.json());
//   app.use(parse.urlencoded({ extended: true }));
//   if (isDev) {
//     app.use(morgan('dev'));
//   }
// };

// ES6
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
// import passport from 'passport';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

export default app => {
  if (isProd) {
    app.use(compression());
    app.use(helmet());
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(passport.initialize());

  if (isDev) {
    app.use(morgan('dev'));
  }
};
