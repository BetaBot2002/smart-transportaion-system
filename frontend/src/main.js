import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider> 
      <App />
    </ChakraProvider>
  </StrictMode>
);
