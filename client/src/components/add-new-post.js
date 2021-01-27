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
} from '@chakra-ui/core';

import React, {useState, useEffect } from 'react';
import db from '../lib/firebase';

// AddNewPost component resonsible for opening a modal to add a new post. 
const AddNewPost = () => {
    // Chakra's useDisclosure hook to help handle common open, close or toggle scenarios.
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState("");
    const [isSaving, setSaving] = useState(false);

    const handleSubmit = async() => {
        const date = new Date();

        await db.collection("posts").add({
            title, 
            upVotesCount: 0,
            downVoteCount: 0,
            createdAt: date.toUTCString(),
            updatedAt: date.toUTCString(),
        });

        onClose();
        setTitle("");
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
                            <FormControl id="post-title">
                                <FormLabel>Post Title</FormLabel>
                                <Textarea 
                                    type="post-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <HStack spacing={4}>
                                <Button onClick={onClose}>Close</Button>
                                <Button
                                    onClick={handleSubmit}
                                    colorScheme="blue"
                                    disabled={!title.trim()}
                                    isLoading={isSaving}
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