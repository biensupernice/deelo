import { AppProps } from 'next/app';
import { Chakra } from 'components/Chakra';
import '../css/pmndrs.css';
import 'typeface-inter';

function App({ Component, pageProps }: AppProps) {
  return (
    <Chakra>
      <Component {...pageProps} />
    </Chakra>
  );
}

export default App;
