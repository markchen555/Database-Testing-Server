// ES5
// const userRouter = require('./userRouter');

// module.exports = function (app) {
//   app.use('/api/v1/users', userRouter);
// };

// ES6
import userRouter from './userRouter';
// import { authJwt } from '../services/auth';

import postRouter from './postRouter';

export default app => {
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/posts', postRouter);
  // app.get('/jwt', authJwt, (req, res) => {
  //   res.send('Private Route Testing!!!');
  // });
};
