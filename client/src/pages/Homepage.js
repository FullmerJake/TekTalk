import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_POSTS } from '../utils/queries';
import Post from '../components/post';
import { Container } from '@chakra-ui/core';



const Homepage = () => {
  const { data } = useQuery(QUERY_POSTS);

  const posts = data?.posts || [];
  console.log(posts);

    return (
        <>
            <Container maxW='md' centerContent p={8}>
                <Post posts={posts} />
            </Container>
        </>
    );
};

export default Homepage;

