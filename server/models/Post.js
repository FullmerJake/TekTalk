const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');

const postSchema = new Schema(
  {
    postTitle: {
      type: String, 
      required: 'You need to title your post!',
      minlength: 1,
      maxlength: 60
    },
    postText: {
      type: String, 
      required: 'You need to add text to your post!',
      minlength: 1,
      maxlength: 280
    }, 
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String, 
      required: true
    },
    tags: {
      type: String,
      required: false
    },
    comments: [commentSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Post = model('Post', postSchema);

module.exports = Post;

