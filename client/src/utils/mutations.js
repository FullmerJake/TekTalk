import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
mutation addPost($postTitle: String!, $postText: String!) {
  addPost(postTitle: $postTitle, postText: $postText) {
    _id
    postTitle
    postText
    createdAt
    username
    commentCount
    comments {
      _id
    }
  }
}
`;

export const ADD_COMMENT = gql`
mutation addComment($postId: ID!, $commentText: String!) {
  addComment(postId: $postId, commentText: $commentText) {
    _id
    commentCount
    comments {
      _id
      commentText
      createdAt
      username
    }
  }
}
`;