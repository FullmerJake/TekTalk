import { Box, HStack, Text, Container } from '@chakra-ui/core';
import React from 'react';
import VoteButtons from './vote-buttons';


const Post = ({ posts }) => {
    if (!posts.length) {
        return <h3>No Posts Yet</h3>;
    }

    return (
        <Container>
            {posts.map(post => (
                <HStack key={post.id} w="100%" alignItems="flex-start">
                    <VoteButtons post={post} />
                    <Box bg="gray.100" p={4} rounded="md" w="100%" margin="15px">
                        <Text textDecoration="underline">{post.postTitle}</Text>
                        <Text>{post.postText}</Text>
                    </Box>
                </HStack>
            ))}
        </Container>
    );
}

export default Post;