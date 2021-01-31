import { Box, HStack, Text, Container, Heading } from '@chakra-ui/core';
import React from 'react';
import VoteButtons from './vote-buttons';


const Post = ({ posts }) => {
    if (!posts.length) {
        return <Text>No Posts Yet</Text>;
    }

    return (
        <Container>
            {posts &&
                posts.map(post => (
                <HStack key={post._id} w="100%" alignItems="flex-start">
                    {/* <VoteButtons post={post} /> */}
                    <Box bg="gray.100" p={4} rounded="md" w="100%" margin="15px">
                        <Heading as="h2" size="2xl" textDecoration="underline">{post.postTitle}</Heading>
                        <Text>{post.postText}</Text>
                        <Text>Posted by {post.username} on {post.createdAt}</Text>
                    </Box>
                </HStack>
            ))}
        </Container>
    );
}

export default Post;