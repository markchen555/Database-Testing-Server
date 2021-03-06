import HTTPStatus from 'http-status';
import Post from '../../db/model/postModel';
import User from '../../db/model/userModel';

export async function createPost(req, res) {
  try {
    const post = await Post.createPost(req.body, req.user._id);
    return res.status(HTTPStatus.CREATED).json(post);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getPostById(req, res) {
  try {
    const promise = await Promise.all([
      User.findById(req.user._id),
      Post.findById(req.params.id).populate('user')
    ]);

    const favorite = promise[0]._favorites.isPostIsFavorite(req.params.id);
    const post = promise[1];

    // const post = await Post.findById(req.params.id).populate('user');
    return res.status(HTTPStatus.OK).json({
      ...post.toJSON(),
      favorite
    });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getPostslist(req, res) {
  const limit = +req.query.limit;
  const skip = +req.query.skip;
  try {
    const promise = await Promise.all([
      User.findById(req.user._id),
      Post.list({ limit, skip })
    ]);
    const posts = promise[1].reduce((arr, post) => {
      const favorite = promise[0]._favorites.isPostIsFavorite(post._id);
      arr.push({
        ...post.toJSON(),
        favorite
      })
      return arr;
    }, [])

    // const posts = await Post.list({ limit, skip });
    return res.status(HTTPStatus.OK).json(posts);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function updatePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    // Mongo build in equal method
    if (!post.user.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    Object.keys(req.body).forEach(key => {
      post[key] = req.body[key];
    });
    // mongoose build in save method
    return res.status(HTTPStatus.OK).json(await post.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function deletePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.user.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    // mongoose build in remove method
    await post.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function favoritePost(req, res) {
  try {
    const user = await User.findById(req.user._id);
    await user._favorites.posts(req.params.id);
    return res.sendStatus(HTTPStatus.OK);
  } catch(e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
