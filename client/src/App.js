import { Container, Flex, Spinner, VStack } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import Post from './components/post';
import Navbar from './components/navbar';
import db from './lib/firebase';


const  App = () => {
  const [posts, setPosts] = useState([]);

  // responsible for fetching the intial set of posts from Firebase
  useEffect(() => {
    // Hook to handle the initial fethching of post
    db.collection("post")
      .orderBy("createdAt", "desc")
      .get()
      // Once fetched, store all the posts in the posts state
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(data);
      });
  }, []);

  // renderding a list of posts from the posts state using the Post component
  // Post component responsbile for handling the rending of single posts. 
  return (
    <>
      <Navbar />
        <Container maxW='md' centerContent p={8}>
          <VStack spacing={8} w="100%">
            {posts.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </VStack>
        </Container>
    </>
  );
}

export default App;