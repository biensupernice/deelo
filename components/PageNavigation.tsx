import { Box, chakra, Heading, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';

const PageNavigation = ({
  allDocs,
  currentPageIndex,
  previousPage,
  nextPage,
}) => {
  const { colorMode } = useColorMode();
  const isLight = colorMode === 'light';
  const currentPageExists = allDocs[currentPageIndex];
  const hasNextOrPreviousPage = previousPage || nextPage;

  return (
    <>
      {currentPageExists ? (
        <Box
          display="flex"
          justifyContent="flex-end"
          width="100%"
          pb="1rem"
          ml="auto"
          mr="auto"
          mt="2rem"
        >
          <chakra.a
            target="_blank"
            rel="noopener noreferrer"
            fontSize="lg"
            color={isLight ? "gray.900" : "gray.300"}
            href={`https://github.com/kennetpostigo/deelo/tree/main/docs/docs${allDocs[currentPageIndex].url}.mdx`}
          >
            Edit this page on GitHub
          </chakra.a>
        </Box>
      ) : null}

      {hasNextOrPreviousPage && (
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          mt="1rem"
          ml="auto"
          mr="auto"
        >
          {previousPage && (
            <Box>
              <Heading
                as="h5"
                size="sm"
                textTransform="uppercase"
                color="gray.500"
              >
                Previous
              </Heading>
              <Box fontSize="2xl" textTransform="capitalize">
                <Link href={previousPage.url}>
                  <a>{previousPage.title}</a>
                </Link>
              </Box>
            </Box>
          )}

          {nextPage && (
            <Box ml="auto" textAlign="right">
              <Heading
                as="h5"
                size="sm"
                textTransform="uppercase"
                color="gray.500"
              >
                Next
              </Heading>
              <Box fontSize="2xl" textTransform="capitalize">
                <Link href={nextPage.url}>
                  <a>{nextPage.title}</a>
                </Link>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default PageNavigation;
