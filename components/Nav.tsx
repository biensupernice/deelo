import {
  chakra,
  Heading,
  ListItem,
  UnorderedList,
  useColorMode,
  useTheme,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { ChakraLink } from './ChakraLink';

type NavRoute = {
  url: string;
  title: string;
};

type NavProps = {
  nav: Record<string, Record<string, NavRoute>>;
};

function NavItem({ route }) {
  const { asPath } = useRouter();
  const isActive = route.url === asPath;
  const { colorMode } = useColorMode();
  const isLight = colorMode === 'light';

  return (
    <ListItem
      listStyleType="none"
      width="100%"
      display="flex"
      alignItems="center"
      ml="-15px"
      pl="15px"
      pr="15px"
      bg={isActive ? isLight ? 'gray.100' : 'blackAlpha.400' : "inherit"}
      borderRadius="6px"
      height="35px"
    >
      <ChakraLink href={route.url.replace('index', '')}>
        <chakra.span
          color={
            isActive
              ? isLight
                ? 'gray.900'
                : 'whiteAlpha.900'
              : isLight
              ? 'gray.600'
              : 'whiteAlpha.700'
          }
          fontWeight={isActive ? '500' : '400'}
          textTransform="capitalize"
        >
          {route.title}
        </chakra.span>
      </ChakraLink>
    </ListItem>
  );
}

function Nav({ nav }: NavProps) {
  return (
    <UnorderedList width="100%" margin="0px">
      {Object.entries(nav).map(([key, children], index) => (
        <Fragment key={`${key}-${index}`}>
          <Heading
            as="h3"
            size="sm"
            margin="0px"
            marginBottom="0.5rem"
            mt="1rem"
            textTransform="uppercase"
          >
            {key.split('-').join(' ')}
          </Heading>
          {Object.entries(children).map(([key, route], index) => (
            <Fragment key={`${key}-${index}`}>
              <NavItem route={route} />
            </Fragment>
          ))}
        </Fragment>
      ))}
    </UnorderedList>
  );
}

export default Nav;
