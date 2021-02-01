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
    posts: [
      {
      type: Schema.Types.ObjectId,
      ref: 'Post'
      }
    ],
    likedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// validate incoming password against hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;