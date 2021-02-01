import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_COMMENT } from '../utils/mutations';
import {
    Box,
    Button, 
    FormControl,
    FormLabel,
    Textarea,
} from '@chakra-ui/core';

const AddComment = ({ postId }) => {

    const [commentText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleChange = event => {
      if (event.target.value.length <= 300) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
      }
    };

    const handleSubmit = async event => {
      event.preventDefault();

      try {
          await addComment({
              variables: { commentText, postId }
          });

          setText('');
          setCharacterCount(0);
      } catch (e) {
          console.error(e);
      }
    };

  return (
    <Box rounded="md" w="100%" margin="15px">
      <FormControl id="post-text">
        <FormLabel>Add Comment</FormLabel>
          <Textarea 
            type="comment-text"
             value={commentText}
             onChange={handleChange}
         />
         <p className={`m-0 ${characterCount === 300 ? 'text-error' : ''}`}>
         Character Count: {characterCount}/300</p>
        {error && <span className="ml-2">{''}You must add text to your comment!</span>}
      </FormControl>
      <Button
        onClick={handleSubmit}
        colorScheme="blue"
      >
          Submit
      </Button>
    </Box>
  );
};

export default AddComment;