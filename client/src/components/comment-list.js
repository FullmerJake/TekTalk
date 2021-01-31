import React from 'react';
import { Container, Box, Text, HStack, Heading } from '@chakra-ui/core';

const CommentList = ({ comments }) => {
  return (
    <Container>
      <Heading as="h3" size="lg" textDecoration="underline">Comments</Heading>
      {comments &&
          comments.map(comment => (
          <HStack key={comment._id} w="100%" alignItems="flex-start">
              {/* <VoteButtons post={post} /> */}
              <Box bg="gray.100" p={4} rounded="md" w="100%" margin="15px">
              <Heading as="h4" size="md" textDecoration="underline">{comment.username}</Heading>
                  <Text>{comment.commentText}</Text>
                  <Text>{comment.createdAt}</Text>
              </Box>
          </HStack>
      ))}
    </Container>
  );
};

export default CommentList;