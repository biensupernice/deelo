import {
  chakra,
  Heading,
  Link,
  Text,
  useColorMode,
  useTheme,
} from '@chakra-ui/react';
import clsx from 'clsx';

type TocItem = {
  depth: number;
  slug: string;
  title: string;
};

type Toc = TocItem[];

type TocProps = {
  toc: Toc;
};

function Toc({ toc }: TocProps) {
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";
  const theme = useTheme();
  const gStyles = theme.styles.global({ theme, colorMode });

  return (
    <chakra.div
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      overflowY="auto"
      position="fixed"
    >
      <Heading as="h3" size="xs" textTransform="uppercase" mb="0.5rem">
        On This Page
      </Heading>
      {toc.map((item) => (
        <Text key={item.slug} className={clsx(item.depth === 3 && 'ml-4')}>
          <Link
            display="block"
            fontSize="sm"
            fontWeight="500"
            color={isLight ? "gray.500" : "gray.400"}
            mb="0.5rem"
            className="block py-1 text-sm font-normal leading-6 text-gray-500 hover:underline"
            href={`#${item.slug}`}
          >
            {item.title}
          </Link>
        </Text>
      ))}
    </chakra.div>
  );
}

export default Toc;
