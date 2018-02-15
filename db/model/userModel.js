import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

import Post from './postModel';
// Use destruction if the import file is not export default. In this case it's export const.
import { passwordReg } from '../validation/user_validations';
import constants from '../../server/config/constants';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    require: [true, 'Email is required!'],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid emal!',
    },
  },
  firstName: {
    type: String,
    required: [true, 'FirstName is required!'],
    trim: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: [true, 'LastName is required!'],
    trim: true,
    unique: true,
  },
  userName: {
    type: String,
    required: [true, 'UserName is required!'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    trim: true,
    minlength: [6, 'Password need to be longer!'],
    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: '{VALUE} is not a valid password!',
    },
  },
  favorites: {
    posts: [{
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }]
  }
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

// MongoDB build in feature
// This feature will triger if we update a user
UserSchema.pre('save', function (next) {
  // This in here is the user
  // If we don't use isModifed, the password will bcrypt again.
  if (this.isModified('password')) {
    // Method is availabe in "this" to use
    this.password = this._hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  _authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      constants.JWT_SECRET,
    );
  },
  toAuthJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      token: `JWT ${this.createToken()}`,
      email: this.email,
    };
  },
  // Mongo build in Method
  toJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      email: this.email,
    };
  },
  _favorites: {
    async posts(postId) {
      if (this.favorites.posts.indexOf(postId) >= 0) {
        this.favorites.posts.remove(postId);
        await Post.decFavoriteCount(postId);
      } else  {
        this.favorites.posts.push(postId);
        await Post.incFavoriteCount(postId);
      }
      return this.save();
    },
    isPostIsFavorite(postId) {
      if (this.favorites.posts.indexOf(postId) >= 0) {
        return true;
      }
      return false;
    }
  }
};

export default mongoose.model('User', UserSchema);
