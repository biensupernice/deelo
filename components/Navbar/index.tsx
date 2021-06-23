import { useRef } from 'react';
import { IconButton } from '@chakra-ui/button';
import { FiMenu } from 'react-icons/fi';
import {
  Box,
  Text,
  Icon,
  useColorMode,
  useDisclosure,
  useTheme,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Drawer,
} from '@chakra-ui/react';
import { ChakraLink } from 'components/ChakraLink';
import Search from 'components/Navbar/Search';
import ThemeSwitcher from 'components/ThemeSwitcher';
import Nav from 'components/Nav';

const Navbar = ({ allDocs, nav }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const gStyles = theme.styles.global({ theme, colorMode });

  return (
    <>
      <Box
        position="sticky"
        top="0"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex="40"
        width="100%"
        color="gStyles.body.color"
        bg={gStyles.body.bg}
        shadow="sm"
        pl="1rem"
        pr="1rem"
      >
        <Logo />
        <Box
          ml="1rem"
          display="flex"
          width="18rem"
          flex="1 1 auto"
          height="4rem"
          alignItems="center"
          justifyContent="center"
        >
          <Search allDocs={allDocs} />
        </Box>
        <Box display="flex" justifyContent="flex-end" width="18rem" ml="1rem">
          <ThemeSwitcher />
          <IconButton
            size="md"
            aria-label="Open Menu"
            ref={btnRef}
            onClick={onOpen}
            icon={
              <Icon
                as={FiMenu}
                fontSize="xl"
                sx={{
                  '@media only screen and (max-width: 380px)': {
                    fontSize: 'md',
                  },
                }}
              />
            }
            variant="ghost"
            sx={{
              '@media only screen and (min-width: 1059px)': {
                display: 'none',
              },
              '@media only screen and (max-width: 380px)': {
                size: 'sm',
              },
            }}
          />
        </Box>
      </Box>
      {
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody>
                <Nav nav={nav} />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      }
    </>
  );
};

const Logo = () => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const gStyles = theme.styles.global({ theme, colorMode });

  return (
    <Box
      display="flex"
      alignItems="center"
      pl="1rem"
      width="18rem"
      sx={{
        '@media only screen and (max-width: 1059px)': {
          // ml: "1rem",
          pl: '0rem',
        },
      }}
    >
      <ChakraLink display="flex" href="/" width="calc(100% - 140px)">
        <Text
          color={gStyles.body.color}
          fontSize="lg"
          fontWeight="bold"
          sx={{
            '@media only screen and (max-width: 1059px)': {
              fontSize: 'md',
            },
          }}
        >
          DEXTR
        </Text>
        <Text
          color={gStyles.body.color}
          fontSize="lg"
          sx={{
            '@media only screen and (max-width: 1059px)': {
              fontSize: 'md',
            },
          }}
        >
          .docs
        </Text>
      </ChakraLink>
    </Box>
  );
};

export default Navbar;
