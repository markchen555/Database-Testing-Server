import { Router } from 'express';
import validate from 'express-validation';

import * as postController from '../controller/postController';
import { authJwt } from '../services/auth';
import postValidation from '../../db/validation/post_validations';

const routes = new Router();

routes.post('/', authJwt, validate(postValidation.createPost), postController.createPost);
routes.get('/:id', postController.getPostById);
routes.get('/', postController.getPostslist);
routes.patch('/:id', authJwt, validate(postValidation.updatePost), postController.updatePost);
routes.delete('/:id', authJwt, postController.deletePost);

// Favorites
routes.post('/:id/favorite', authJwt, postController.favoritePost);

export default routes;
