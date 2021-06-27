import React from 'react';
import { experimentalStyled } from '@material-ui/core';
import MainNavbar from './navigation.layout';

/**
 * @tutorial 'https://github.com/devias-io/material-kit-react/blob/main/src/components/MainLayout.js
 */
const MainLayoutRoot = experimentalStyled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%',
}));

const MainLayoutWrapper = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
});

const MainLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
});

const MainLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
});

const MainLayout = ({ children }: { children?: React.ReactNode }) => (
  <MainLayoutRoot>
    <MainNavbar />
    <MainLayoutWrapper>
      <MainLayoutContainer>
        <MainLayoutContent>{children}</MainLayoutContent>
      </MainLayoutContainer>
    </MainLayoutWrapper>
  </MainLayoutRoot>
);

export default MainLayout;
