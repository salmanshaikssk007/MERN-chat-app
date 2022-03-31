import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App';
import ChatProvider from './context/chatProviders'


ReactDOM.render(

  <BrowserRouter>
    <ChatProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>  
    </ChatProvider> 
  </BrowserRouter> ,
  document.getElementById('root')
);

