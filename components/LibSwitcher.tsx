import { useEffect, useState } from 'react';
import { Portal } from '@chakra-ui/portal';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { Box, Heading } from '@chakra-ui/layout';
import { FiPackage } from 'react-icons/fi';
import { CgSelect } from 'react-icons/cg';
import Icon from '@chakra-ui/icon';

export default function LibSwitcher({ allDocs, paths, navigate, path }) {
  const [activeDocs, setActiveDocs] = useState(() => paths[0]);
  const getInitialLibDoc = (p) =>
    allDocs.filter((doc) => doc.url.includes(p)).sort((doc) => doc.nav)[0]
      .url;

  useEffect(() => {
    if (!path.includes(activeDocs)) {
      setActiveDocs(() => paths.filter(p => path.includes(p))[0])
    }
  }, [path])

  return (
    <>
      <Menu>
        <MenuButton
          aria-label="SDK Documentation"
          width="100%"
          pl="15px"
          pr="15px"
          ml="-15px"
          bg={'blue.600'}
          borderRadius="6px"
          height="40px"
          variant="unstyled"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            textAlign="left"
          >
            <Box display="flex">
              <Icon as={FiPackage} color="#fff" fontSize="xl" mr="10px" />
              <Heading
                as="h3"
                size="sm"
                mt="1px"
                color="#fff"
                fontWeight="semibold"
                textTransform="uppercase"
              >
                {activeDocs}
              </Heading>
            </Box>
            <Icon as={CgSelect} color="#fff" fontSize="2xl" />
          </Box>
        </MenuButton>
        <Portal>
          <MenuList zIndex="12">
            {paths.map((path) => (
              <MenuItem
                onClick={() => {
                  setActiveDocs(path);
                  navigate(getInitialLibDoc(path));
                }}
                key={path}
              >
                {path}
              </MenuItem>
            ))}
          </MenuList>
        </Portal>
      </Menu>
    </>
  );
}
