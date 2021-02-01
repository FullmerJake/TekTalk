import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_POST } from '../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';
import {
    Button, 
    FormControl,
    FormLabel,
    Textarea,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    HStack,
    useDisclosure,
    Input
} from '@chakra-ui/core';



const AddNewPost = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ postTitle, setTitle] = useState("");
    const [ postText, setText] = useState("");
    const [characterCount, setCharacterCount] = useState(0);

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {
            try {
                const { posts } = cache.readQuery({ query: QUERY_POSTS });
                cache.writeQuery({
                    query: QUERY_POSTS,
                    data: { posts: [addPost, ...posts] }
                });
            } catch (e) {
                console.error(e);
            }
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: {...me, posts: [...me.posts, addPost ] } }
            });
        }
    });

    const handleChangeTitle = event => {
        setTitle(event.target.value)
    };

    const handleChange = event => {
        if(event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setTitle(event.target.value);

        try {
            await addPost({
                variables: { postTitle, postText }
            });

            setTitle('');
            setText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Button onClick={onOpen} colorScheme="blue">
                Add new post
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Add new Post</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl id="post-text">
                                <FormLabel>Post Title</FormLabel>
                                <Input 
                                    type="post-title"
                                    value={postTitle}
                                    onChange={handleChangeTitle}
                                />
                                <Textarea 
                                    type="post-text"
                                    value={postText}
                                    onChange={handleChange}
                                />
                                <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
                                Character Count: {characterCount}/280</p>
                                {error && <span className="ml-2">{''}You must add text to your post!</span>}
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <HStack spacing={4}>
                                <Button onClick={onClose}>Close</Button>
                                <Button
                                    onClick={handleSubmit}
                                    colorScheme="blue"
                                >
                                    Save
                                </Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    );
};

export default AddNewPost;