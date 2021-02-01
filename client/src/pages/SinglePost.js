import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_POST } from '../utils/queries';
import { Box, Text, Heading } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth'

import CommentList from '../components/comment-list';
import AddComment from '../components/add-comment';

const SinglePost = () => {

  const { id: postId } = useParams();

  const { data } = useQuery(QUERY_POST, {
    variables: { id: postId }
  });

  const post = data?.post || {};

  return (
    <Box p={4} rounded="md" w="70%" margin="auto">
      <Box bg="gray.100" p={4} rounded="md" w="100%" margin="15px">
          <Heading as="h2" size="3xl" textDecoration="underline">{post.postTitle}</Heading>
          <Text py={10}>{post.postText}</Text>
          <Text>
            <Link to={`/profile/${post.username}`}>{post.username}</Link> 
          {' '}posted on {post.createdAt}</Text>
      </Box>
      {Auth.loggedIn() && <AddComment postId={post._id} />}
      {post.commentCount > 0 && <CommentList comments={post.comments} />}
    </Box>
  )
}

export default SinglePost;