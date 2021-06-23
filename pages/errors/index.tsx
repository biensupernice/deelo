export default function Index() {
  return null;
}

async function getInitialProps({ res }) {
  const targetURL = '/errors/getting-started/introduction';
  res.writeHead(307, { Location: targetURL });
  res.end();
  return {};
}

Index.getInitialProps = getInitialProps;
