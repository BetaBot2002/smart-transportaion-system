// src/components/Common/Loader.test.js
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Loader } from '../utils/Loader.js';

test('renders Loader component with a spinner', () => {
  render(
    <ChakraProvider>  {/* Wrap with ChakraProvider to prevent errors */}
      <Loader />
    </ChakraProvider>
  );

  // Check if Spinner is present in the document
  const spinner = screen.getByTestId('loader');  // Spinner has `role="status"`
  expect(spinner).toBeInTheDocument();
});
