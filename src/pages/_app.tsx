import '../../styles/globals.css';
import 'tailwindcss/tailwind.css'

import { Provider } from 'react-redux';

import * as React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';

import theme from 'settings/theme';
import createEmotionCache from 'settings/emotion-cache';
import { store } from 'settings/store';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <div style={{backgroundColor: "#E2EFE0", minHeight: '100vh'}}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
