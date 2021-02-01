import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Heading, Box } from '@chakra-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import Post from '../components/post';
import AddNewPost from '../components/add-new-post';


const Profile = props => {
  const { username: userParam } = useParams();

  const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};
  
  if (
    Auth.loggedIn() &&
    Auth.getProfile().data.username === userParam
  ) {
    return <Redirect to="/profile" />;
  }
 
  return (
    <Box p={4} rounded="md" w="80%" margin="auto">
      <Heading pb={7} as="h2" size="3xl">{userParam ? `${user.username}` : 'My Profile'}</Heading>
      <Heading as="h2" size="xl">Posts:</Heading>
      <Post posts={user.posts} />
      <AddNewPost />
    </Box>
  );
}

export default Profile;