import { Router } from 'express';
// const { Router } = require('express');
import validate from 'express-validation';

import { authLocal } from '../../server/services/auth';

import * as userController from '../controller/userController';
// const { * } = require('../controller/userController');
import userValidation from '../../db/validation/user_validations';

const routes = new Router();

routes.post('/signup', validate(userValidation.signup), userController.signUp);
routes.post('/login', authLocal, userController.login);

export default routes;
