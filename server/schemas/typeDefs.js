const { gql } = require('apollo-server-express');

const typeDefs = gql `
type User {
  _id: ID
  username: String
  email: String
  posts: [Post]
}

type Post {
  _id: ID
  postTitle: String
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
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(_id: ID!): Post
  }

  type Mutation {
    login(email: String!, password: String!): User
    addUser(username: String!, email: String!, password: String!): User
  }
  `;

module.exports = typeDefs;