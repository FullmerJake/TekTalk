import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';
import { Container, VStack, Button, Input } from '@chakra-ui/core';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = event => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState }
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container maxW='md' centerContent p={50}>
      <VStack spacing={8} w="75%">
        <h4 >Sign Up</h4>
            <div >
              <form onSubmit={handleFormSubmit}>
                <Input
                  colorScheme=""
                  variant="outline"
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="username"
                  id="username"
                  value={formState.username}
                  onChange={handleChange}
                />
                <Input
                  variant="outline"
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  id="signup-email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <Input
                  variant="outline"
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  id="signup-password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <Container maxW='md' centerContent p={8}>
                  <VStack spacing={8} w="100%">
                    <Button colorScheme="blue" type="submit">
                      Submit
                    </Button>               
                  </VStack>
                </Container>
              </form>

              {error && <div>Signup failed</div>}
            </div>
      </VStack>
    </Container>


  );
};

export default Signup;
