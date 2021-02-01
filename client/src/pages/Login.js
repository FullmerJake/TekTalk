import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';
import { Container, VStack, Button, Input, Heading } from '@chakra-ui/core';

import Auth from '../utils/auth';
import Signup from './Signup';

const Login = props => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState }
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: ''
    });
  };

  return (
    <Container maxW='md' centerContent p={8}>
      <VStack spacing={8} w="100%">
        <Heading as="h2" size="xl">Login</Heading>
          <div>
            <form onSubmit={handleFormSubmit}>
              <Input
                variant="outline"
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="login-email"
                value={formState.email}
                onChange={handleChange}
              />
              <Input
                variant="outline"
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="login-password"
                value={formState.password}
                onChange={handleChange}
              />
              <Container maxW='md' centerContent p={8}>
                <VStack spacing={8} w="100%">
                  <Button colorScheme="blue" type="submit" id="tiktok-btn">
                    Submit
                  </Button>               
                </VStack>
              </Container>

            </form>

            {error && <div>Login failed</div>}
          </div>
          <Signup  />
          </VStack>
      </Container>
  )
};

export default Login;
