import { Box, HStack, Text, Heading } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import VoteButtons from './vote-buttons';


const Post = ({ posts }) => {
    if (!posts) {
        return <Text>No Posts Yet</Text>;
    }

    return (
        <Box >
            {posts &&
                posts.map(post => (
                <HStack key={post._id} w="100%" alignItems="flex-start">
                    {/* <VoteButtons post={post} /> */}
                    <Box bg="gray.100" p={4} rounded="md" w="100%" margin="15px">
                        <Heading as="h2" size="2xl" textDecoration="underline">
                            <Link to={`/post/${post._id}`}>{post.postTitle}</Link> 
                        </Heading>
                        <Text py={10}>{post.postText}</Text>
                        <Text>
                            <Link to={`/profile/${post.username}`}>{post.username}</Link> 
                        {' '}posted on {post.createdAt}</Text>
                        <Link to={`/post/${post._id}`}>{post.commentCount} comments</Link>
                    </Box>
                </HStack>
            ))}
        </Box>
    );
}

export default Post;