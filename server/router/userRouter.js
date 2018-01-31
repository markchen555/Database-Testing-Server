import { Router } from 'express';
// const { Router } = require('express');

import * as userController from '../controller/userController';
// const { * } = require('../controller/userController');

const routes = new Router();

routes.post('/signup', userController.signUp);

export default routes;
