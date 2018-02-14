import { Router } from 'express';
import validate from 'express-validation';

import * as postController from '../controller/postController';
import { authJwt } from '../services/auth';
import postValidation from '../../db/validation/post_validations';

const routes = new Router();

routes.post('/', authJwt, validate(postValidation.createPost), postController.createPost);
routes.get('/:id', postController.getPostById);

export default routes;
