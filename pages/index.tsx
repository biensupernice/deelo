export default function Index() {
  return null;
}

async function getInitialProps({ res }) {
  const targetURL = '/javascript/getting-started/quick-start';
  if (res) {
    res.writeHead(307, { Location: targetURL });
    res.end();
  } else {
    // @ts-ignore
    window.location = targetURL;
    await new Promise((resolve) => {});
  }
  return {};
}

Index.getInitialProps = getInitialProps;
