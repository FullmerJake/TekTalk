import { Container, Flex, Spinner, VStack } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import Post from './components/post';
import Navbar from './components/navbar';
import db from './lib/firebase';


const  App = () => {
  useEffect(() => {
    // Hook to handle the real-time updating of posts whenever there is a
    // change in the datastore (https://firebase.google.com/docs/firestore/query-data/listen#view_changes_between_snapshots)

    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const _posts = [];

        querySnapshot.forEach((doc) => {
          _posts.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setPosts(_posts);
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