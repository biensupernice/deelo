import LibSwitcher from 'components/LibSwitcher';
import { chakra, Box } from '@chakra-ui/react';
import Nav from 'components/Nav';
import Toc from 'components/Toc';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import PageNavigation from './PageNavigation';

export default function Layout(props) {
  const { nav, toc, allDocs, paths } = props;
  const { query: { slug }, asPath, push } = useRouter() // prettier-ignore
  const [lib] = slug as string[];
  const currentPageIndex = allDocs.findIndex((item) => item.url === asPath);
  const previousPage = currentPageIndex > 0 && allDocs[currentPageIndex - 1];
  const nextPage =
    currentPageIndex < allDocs.length - 1 && allDocs[currentPageIndex + 1];

  return (
    <>
      <Navbar allDocs={allDocs} nav={nav[lib]} />
      <Box display="flex" width="100%" mt="1.5rem" boxSizing="border-box">
        <Box
          display="flex"
          sx={{
            '@media only screen and (max-width: 1059px)': {
              display: 'none',
            },
          }}
        >
          <Box
            id="sidebar"
            position="relative"
            top="0px"
            right="0px"
            left="0px"
            bottom="0px"
            width="18rem"
            height="100%"
            zIndex="10"
            overflowY="auto"
            flex="none"
          >
            <chakra.nav
              id="nav"
              padding="1rem"
              paddingTop="1.6rem"
              overflowY="auto"
              pb="2.5rem"
              pl="2rem"
              zIndex="10"
              position="fixed"
              width="18rem"
            >
              <LibSwitcher navigate={push} allDocs={allDocs} paths={paths} path={asPath}/>
              <Nav nav={nav[lib]} />
            </chakra.nav>
          </Box>
        </Box>
        <Box id="content-wrapper" flex="1 1 auto" width="100%">
          <Box display="flex" justifyContent="center" width="100%">
            <Box maxWidth="48rem" width="100%" padding="1rem" pb="4rem">
              <Box width="100%">{props.children}</Box>
              <PageNavigation
                allDocs={allDocs}
                currentPageIndex={currentPageIndex}
                previousPage={previousPage}
                nextPage={nextPage}
              />
            </Box>
          </Box>
        </Box>
        <Box
          flex="none"
          width="18rem"
          pl="2rem"
          mr="2rem"
          sx={{
            '@media only screen and (max-width: 1200px)': {
              display: 'none',
            },
          }}
        >
          {toc.length ? <Toc toc={toc} /> : null}
        </Box>
      </Box>
    </>
  );
}
