import fs from 'fs';
import matter from 'gray-matter';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import path from 'path';
import {
  getDocsPaths,
  getAllDocs,
  DOCS_PATH,
  getLibraries,
} from 'utils/mdxUtils';
import Layout from 'components/Layout';
import components from 'components/MDXComponents';
import prism from 'remark-prism';
import withTableofContents from 'remark/withTableofContents';
import setValue from 'set-value';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { useColorMode } from '@chakra-ui/color-mode';

export default function PostPage({
  toc,
  source,
  allDocs,
  nav,
  frontMatter,
  paths,
}) {
  const content = hydrate(source, { components });
  const { colorMode } = useColorMode();
  const isLight = colorMode === 'light';

  return (
    <Layout nav={nav} toc={toc} allDocs={allDocs} paths={paths}>
      <main>
        {frontMatter.title && (
          <Box
            mb="1rem"
            borderBottomWidth="1px"
            borderBottomColor={isLight ? 'gray.200' : 'cyan.100'}
          >
            <Heading
              as="h1"
              size="2xl"
              fontWeight="bold"
              letterSpacing="-0.05em"
              mb="0.5rem"
            >
              {frontMatter.title}
            </Heading>
            {frontMatter.description && (
              <Text
                color={isLight ? 'gray.400' : 'blue.100'}
                fontWeight="medium"
                fontSize="lg"
                mb="1rem"
              >
                {frontMatter.description}
              </Text>
            )}
          </Box>
        )}
        <div className="content-container">{content}</div>
      </main>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const paths = getLibraries();
  const postFilePath = path.join(DOCS_PATH, `${path.join(...params.slug)}.mdx`);
  const source = fs.readFileSync(postFilePath);
  const { content, data } = matter(source);
  const allDocs = await getAllDocs();

  const nav = allDocs.reduce((nav, file) => {
    const [lib, ...rest] = file.url.split('/').filter(Boolean);
    const _path = `${lib}${rest.length === 1 ? '..' : '.'}${rest.join('.')}`;
    setValue(nav, _path, file);
    return nav;
  }, {});

  const toc = [];
  const mdxSource = await renderToString(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [prism, withTableofContents(toc)],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      paths,
      allDocs,
      nav,
      toc,
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  // Map the path into the static paths object required by Next.js
  const paths = (await getDocsPaths()).map((slug) => ({
    params: {
      slug: slug.split(path.sep).filter(Boolean),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
