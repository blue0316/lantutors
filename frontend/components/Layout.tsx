

import React, { ReactNode } from 'react';

import Head from 'next/head';
import { CssBaseline } from '@material-ui/core';

// import Footer from './Footer';
import Header from './Header';
import { Tutor } from '../interfaces';

type Props = {
  children?: ReactNode;
  title?: string;
  tutors: Tutor[];
  about?: string;
};

const Layout = ({
  children,
  title = "Ring's Listings",
  about = 'Meaningful Classifieds',
  tutors,
}: Props) => (
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
    <>
      <>
        <Header tutors={tutors} />
        {/* <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <Link href="/about">
            <a>About</a>
          </Link>{' '}
          |{' '}
          <Link href="/users">
            <a>Users List</a>
          </Link>{' '}
          | <a href="/api/users">Users API</a>
        </nav> */}
      </>
      {children}
      {/* <Footer title={title} description={about} /> */}
    </>
  </>
);

export default Layout;

