import React, { ReactNode } from 'react';

import Head from 'next/head';
import { CssBaseline } from '@material-ui/core';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'Lantutors' }: Props) => (
  <>
    <CssBaseline />
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
      />
    </Head>
    <>{children}</>
  </>
);

export default Layout;
