// import '../styles/globals.css'

import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Global />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
