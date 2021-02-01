import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_POSTS } from '../utils/queries';
import Post from '../components/post';
import { Box, Heading } from '@chakra-ui/core';


const Homepage = () => {
  const { data } = useQuery(QUERY_POSTS);

  const posts = data?.posts || [];

    return (
        <Box p={4} rounded="md" w="70%" margin="auto">
            <Heading as="h2" size="2xl" textDecoration="underline">Recent Posts</Heading>
            <Post posts={posts} />
        </Box>
    );
};

export default Homepage;

