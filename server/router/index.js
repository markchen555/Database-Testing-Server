// ES5
// const userRouter = require('./userRouter');

// module.exports = function (app) {
//   app.use('/api/v1/users', userRouter);
// };

// ES6
import userRouter from './userRouter';

export default app => {
  app.use('/api/v1/users', userRouter);
};
