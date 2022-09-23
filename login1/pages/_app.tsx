import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import theme from "../src/Themes/theme";
import createEmotionCache from "../src/Utils/createEmotionCache";
import "../src/styles/globals.css";
import createCache, { EmotionCache } from "@emotion/cache"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const cache = createCache({
  key: 'css',
  prepend: true,
});


interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
          <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
