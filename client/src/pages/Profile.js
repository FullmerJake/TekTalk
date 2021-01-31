import { useParams } from 'react-router-dom';
import { Container, Heading, Box } from '@chakra-ui/core';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../utils/queries';

import Post from '../components/post';


const Profile = (props) => {
  const { username: userParam } = useParams();

  const { data } = useQuery(QUERY_USER, {
    variables: { username: userParam }
  });

  const user = data?.user || {};

  return (
    <Box p={4} rounded="md" w="100%" margin="auto">
      <Heading as="h2" size="3xl">{user.username}</Heading>
      <Post posts={user.posts} />
    </Box>
  );
}

export default Profile;