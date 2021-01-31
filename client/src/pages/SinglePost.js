import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_POST } from '../utils/queries';
import { Container, Box, Text, Heading } from '@chakra-ui/core';

import CommentList from '../components/comment-list';

const SinglePost = props => {

  const { id: postId } = useParams();

  const { data } = useQuery(QUERY_POST, {
    variables: { id: postId }
  });

  const post = data?.post || {};

  return (
    <Container>
      <Box bg="gray.100" p={4} rounded="md" w="100%" margin="15px">
          <Heading as="h2" size="3xl" textDecoration="underline">{post.postTitle}</Heading>
          <Text>{post.postText}</Text>
          <Text>Posted by {post.username} on {post.createdAt}</Text>
      </Box>
      {post.commentCount > 0 && <CommentList comments={post.comments} />}
    </Container>
  )
}

export default SinglePost;