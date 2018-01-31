import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

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
  },
  lastName: {
    type: String,
    required: [true, 'LastName is required!'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    trim: true,
    minlength: [6, 'Password ned to be longer then 6 characters'],
    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: '{VALUE} is not a valid password',
    },
  },
});

export default mongoose.model('User', UserSchema);
