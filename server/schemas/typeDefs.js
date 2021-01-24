const { gql } = require('apollo-server-express');

const typeDefs = gql `
type Post {
  _id: ID
  postText: String
  createdAt: String
  username: String
  commentCount: Int
  comments: [Comment]
}

type Comment {
  _id: ID
  commentText: String
  createdAt: String
  username: String
}
type Query {
    posts(username: String): [Post]
  }
  `;

module.exports = typeDefs;