import {
  chakra,
  Code,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  useColorMode,
} from '@chakra-ui/react';
import Callout from './Callout';
import Bleed from './Bleed';
import { ChakraLink } from './ChakraLink';

const components = {
  Hint: ({ children }) => (
    <div className="shadow overflow-hidden bg-yellow-100 border-b border-gray-200 sm:rounded-lg px-6 py-4 leading-7 mb-6">
      {children}
    </div>
  ),
  Grid: ({ children }) => (
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700 grid-list">
      {children}
    </ul>
  ),
  Callout,
  Bleed,
  Heading: ({ children, id, level }) => {
    const { colorMode } = useColorMode();
    const isLight = colorMode === 'light';

    return (
      <Link href={`#${id}`} position="relative">
        <chakra.span position="absolute" top="-74px" id={id}></chakra.span>
        <Heading
          fontWeight="extrabold"
          //@ts-ignore
          as={`h${level}`}
          size={
            level === 1 ? 'xl' : level === 2 ? 'lg' : level === 3 ? 'md' : 'sm'
          }
          color={isLight ? 'gray.800' : 'gray.100'}
          mb="1rem"
          mt="1.5rem"
        >
          {children}
        </Heading>
      </Link>
    );
  },
  ul: ({ children }) => (
    <UnorderedList padding="1rem" mb="2rem">
      {children}
    </UnorderedList>
  ),
  ol: ({ children }) => (
    <OrderedList padding="1rem" mb="2rem">
      {children}
    </OrderedList>
  ),
  li: ({ children }) => <ListItem mb="1rem">{children}</ListItem>,
  inlineCode: Code,
  p: ({ children }) => {
    const { colorMode } = useColorMode();
    const isLight = colorMode === 'light';

    return (
      <Text
        color={isLight ? 'gray.700' : 'gray.300'}
        position="relative"
        width="100%"
        wordBreak="break-word"
        lineHeight="1.5rem"
        whiteSpace="normal"
        fontSize="1rem"
        mb="1rem"
      >
        {children}
      </Text>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="mb-8 text-base pl-4 border-l-4 border-gray-600">
      {children}
    </blockquote>
  ),
  table: ({ children }) => {
    return (
      <div className="flex flex-col my-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-6 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow-lg overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="divide-y divide-gray-200 w-full">
                {children}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  },
  a: (props) => {
    if (props.href.startsWith('https://')) {
      return (
        <Link
          className="text-base"
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          color="blue.400"
        >
          {props.children}
        </Link>
      );
    }
    return (
      <ChakraLink className="text-base" href={props.href}>
        {props.children}
      </ChakraLink>
    );
  },
};

export default components;
