import { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import {
  Box,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  UnorderedList,
  ListItem,
  useDisclosure,
  Text,
  InputGroup,
  InputLeftElement,
  Icon,
  Kbd,
  useColorMode,
} from '@chakra-ui/react';
import { matchSorter } from 'match-sorter';
import { useRouter } from 'next/router';
import { ChakraLink } from 'components/ChakraLink';
import { Search2Icon } from '@chakra-ui/icons';
import { FiCornerDownLeft } from 'react-icons/fi';

const Search = ({ allDocs }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocus = useRef(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const inputs = ['input', 'select', 'button', 'textarea'];

    const down = (e) => {
      if (
        document.activeElement &&
        // @ts-ignore
        inputs.indexOf(document.activeElement.tagName.toLowerCase() !== -1)
      ) {
        if (e.key === 'k' && e.metaKey === e.metaKey) {
          e.preventDefault();
          onOpen();
        } else if (e.key === 'Escape') {
          setSearch(() => '');
          onClose();
        }
      }
    };

    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <SearchModal
        allDocs={allDocs}
        isOpen={isOpen}
        onClose={() => {
          setSearch(() => '');
          onClose();
        }}
        initialFocus={initialFocus}
        search={search}
        setSearch={setSearch}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        maxWidth="30rem"
        minWidth="12rem"
        width="100%"
        height="3rem"
        shadow="sm"
        borderWidth="2px"
        borderRadius="0.375rem"
        padding="20px 10px"
        onClick={onOpen}
      >
        <Icon
          as={Search2Icon}
          fontSize="lg"
          color="gray.300"
          mr="10px"
          sx={{
            '@media only screen and (max-width: 1059px)': {
              fontSize: 'md',
            },
          }}
        />
        <Box
          display="flex"
          alignItems="center"
          color="#A0AEC0"
          width="100%"
          height="100%"
        >
          <Text
            fontSize="lg"
            sx={{
              '@media only screen and (max-width: 1059px)': {
                fontSize: '14px',
                mr: "5px",
              },
            }}
          >
            Quick Search
          </Text>
          <Kbd
            fontSize="16px"
            mr="5px"
            sx={{
              '@media only screen and (max-width: 1059px)': {
                fontSize: '12px',
              },
            }}
          >
            ⌘
          </Kbd>
          <Kbd
            fontSize="16px"
            sx={{
              '@media only screen and (max-width: 1059px)': {
                fontSize: '12px',
              },
            }}
          >
            K
          </Kbd>
        </Box>
      </Box>
    </>
  );
};

const Item = ({ title, active, href, onMouseOver, search, onClick }) => {
  const { colorMode } = useColorMode();
  const highlight = title.toLowerCase().indexOf(search.toLowerCase());

  return (
    <ChakraLink
      display="block"
      textDecoration="none"
      href={href}
      onMouseOver={onMouseOver}
      color={active ? 'whiteAlpha.800' : 'blue.400'}
      onClick={onClick}
    >
      <ListItem
        height="60px"
        width="100%"
        display="flex"
        borderRadius="0.375rem"
        alignItems="center"
        justifyContent="space-between"
        pl="20px"
        pr="20px"
        listStyleType="none"
        bg={
          active
            ? 'blue.600'
            : colorMode === 'light'
            ? 'gray.200'
            : 'blackAlpha.400'
        }
        mb="0.5rem"
      >
        <Box display="flex">
          {title.substring(0, highlight)}
          <Text
            color={
              active
                ? 'whiteAlpha.800'
                : colorMode === 'light'
                ? 'blue.400'
                : 'whiteAlpha.700'
            }
            textDecoration={active ? 'underline' : 'none'}
            fontWeight="extrabold"
          >
            {title.substring(highlight, highlight + search.length)}
          </Text>
          <Text
            fontWeight="500"
            color={
              active
                ? 'whiteAlpha.800'
                : colorMode === 'light'
                ? 'gray.700'
                : 'whiteAlpha.700'
            }
          >
            {title.substring(highlight + search.length)}
          </Text>
        </Box>
        <Icon
          fontSize="xl"
          color={active ? 'whiteAlpha.800' : 'gray.500'}
          as={FiCornerDownLeft}
        />
      </ListItem>
    </ChakraLink>
  );
};

const SearchModal = ({
  allDocs,
  isOpen,
  onClose,
  initialFocus,
  search,
  setSearch,
}) => {
  const router = useRouter();
  const [active, setActive] = useState(0);

  const results: { title: string; url: string }[] = useMemo(() => {
    if (!search) return [];
    // Will need to scrape all the headers from each page and search through them here
    // (similar to what we already do to render the hash links in sidebar)
    // We could also try to search the entire string text from each page
    return matchSorter(allDocs, search, { keys: ['title'] });
  }, [search]);

  useEffect(() => {
    setActive(0);
  }, [search]);

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          if (active + 1 < results.length) {
            setActive(active + 1);
          }
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (active - 1 >= 0) {
            setActive(active - 1);
          }
          break;
        }
        case 'Enter': {
          router.push(results[active].url);
          setSearch(() => '');
          onClose();
          break;
        }
      }
    },
    [active, results, router]
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialFocus}
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody padding="0px">
          <Box pl="10px" pr="10px">
            <InputGroup
              display="flex"
              width="100%"
              height="60px"
              alignItems="center"
            >
              <InputLeftElement
                alignSelf="center"
                pointerEvents="none"
                children={
                  <Search2Icon
                    fontSize="xl"
                    ml="-8px"
                    mt="20px"
                    color="blue.500"
                  />
                }
              />
              <Input
                variant="unstyled"
                appearance="none"
                height="60px"
                width="100%"
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search the docs..."
                onKeyDown={handleKeyDown}
                ref={initialFocus}
              />
            </InputGroup>
          </Box>
          {search && results.length ? (
            <>
              <Box
                borderBottomWidth="1px"
                borderBottomColor="black.400"
                mb="1rem"
                width="calc(100% - 20px)"
                ml="10px"
                mr="10px"
              />
              <UnorderedList margin="0px" pl="20px" pr="20px" pb="10px">
                {results.map((res, i) => {
                  return (
                    <Item
                      key={`search-item-${i}`}
                      title={res.title}
                      href={res.url}
                      active={i === active}
                      search={search}
                      onClick={() => {
                        setSearch(() => '');
                        onClose();
                      }}
                      onMouseOver={() => setActive(i)}
                    />
                  );
                })}
              </UnorderedList>
            </>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Search;
