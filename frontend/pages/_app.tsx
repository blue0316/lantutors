import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalStyles from '../styles/global.style';
import theme from '../styles/theme';
import { TutorProvider } from '../context/tutor.context';
import { NotificationProvider } from '../context/notification.context';
import { StudentsProvider } from '../context/students.context';
import { SelectedProvider } from '../context/selected.context';
// import '../styles/globals.css';

declare module '@material-ui/styles' {
  interface DefaultTheme extends Theme {}
}

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <TutorProvider>
          <StudentsProvider>
            <SelectedProvider>
              <NotificationProvider>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
              </NotificationProvider>
            </SelectedProvider>
          </StudentsProvider>
        </TutorProvider>
      </ThemeProvider>
    </>
  );
}
