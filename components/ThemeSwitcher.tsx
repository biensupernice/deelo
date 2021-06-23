import { IconButton } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ThemeSwitcher = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      bg="inherit"
      aria-label="Toggle Docs Theme"
      size="md"
      icon={
        colorMode === 'dark' ? (
          <SunIcon
            fontSize="xl"
            sx={{
              '@media only screen and (max-width: 380px)': {
                fontSize: 'md',
              },
            }}
          />
        ) : (
          <MoonIcon
            fontSize="xl"
            sx={{
              '@media only screen and (max-width: 380px)': {
                fontSize: 'md',
              },
            }}
          />
        )
      }
      sx={{
        '@media only screen and (max-width: 380px)': {
          size: 'sm',
        },
      }}
      onClick={toggleColorMode}
      variant="ghost"
    />
  );
};

export default ThemeSwitcher;
