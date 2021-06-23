import { extendTheme } from '@chakra-ui/react';

// @ts-ignore
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  fonts: { heading: `'Inter'`, body: `'Inter'` },
});

export default theme;
