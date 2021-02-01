import { ChakraProvider} from '@chakra-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
 

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

