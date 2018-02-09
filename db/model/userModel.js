import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';

// Use destruction if the import file is not export default. In this case it's export const.
import { passwordReg } from '../validation/user_validations';

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
};

export default mongoose.model('User', UserSchema);
