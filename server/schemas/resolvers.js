const { User, Post } = require('../models');

const resolvers = {
  Query: {
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    }
  }
};

module.exports = resolvers;