import { ChakraProvider, localStorageManager } from '@chakra-ui/react';
import { ReactNode } from 'react';
import theme from 'theme';

interface ChakraProps {
  children: ReactNode;
}

export const Chakra = ({ children }: ChakraProps) => {
  return (
    <ChakraProvider
      colorModeManager={localStorageManager}
      resetCSS
      theme={theme}
    >
      {children}
    </ChakraProvider>
  );
};
