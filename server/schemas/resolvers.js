const { User, Post } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
      const userData = await User.findOne({ _id: context.user_id })
        .select('-__v -password')
        .populate('posts')
      
      return userData;
      }

      throw new AuthenticationError('Not logged in')
    },
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('posts')
    },
    // get user by username
    user: async (parent, { username}) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('posts')
    },
    // get all posts
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    // get post by id
    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect login credentials!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect login credentials!');
      }

      const token = signToken(user);
      return { token, user };
    },

    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );

        return post;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addComment: async (parent, { postId, commentText}, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $push: { comments: { commentText, username: context.user.username } } },
          { new: true, runValidators: true}
        );

        return updatedPost;
      }

      throw new AuthenticationError('You need to be logged in!')
    }
  }
};

module.exports = resolvers;