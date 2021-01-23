const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String, 
      required: true,
      unique: true,
    },
    email: {
      type: String, 
      required: true, 
      unique: true,
      match: [/.+@.+\..+/, 'You must use a valid email address!'],
    }, 
    password: {
      type: String,
      required: true,
    },
    posts: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// validate password when logging in 
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;