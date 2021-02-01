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
        if(event.target.value.length <= 1500) {
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
            <Button onClick={onOpen} colorScheme="blue" id="tiktok-btn">
                Add New Post
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader id="tiktok-head">Add New Post</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl id="post-text">
                                <FormLabel id="tiktok-head">Post Title</FormLabel>
                                <Input 
                                    type="post-title"
                                    value={postTitle}
                                    onChange={handleChangeTitle}
                                    id="tiktok-input"
                                />
                                <Textarea 
                                    type="post-text"
                                    value={postText}
                                    onChange={handleChange}
                                    id="tiktok-input"
                                />
                                <p className={`m-0 ${characterCount === 1500 ? 'text-error' : ''}`}>
                                Character Count: {characterCount}/1500</p>
                                {error && <span className="ml-2">{''}You must add text to your post!</span>}
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <HStack spacing={4}>
                                <Button onClick={onClose} id="tiktok-btn">Close</Button>
                                <Button
                                    onClick={handleSubmit}
                                    colorScheme="black"
                                    id="tiktok-btn"
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