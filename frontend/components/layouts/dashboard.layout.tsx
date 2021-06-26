import React from 'react';
import { experimentalStyled } from '@material-ui/core';

import DashboardNavbar from './dashboardnavbar.layout';
import DashboardSidebar from './dashboardsidebar.layout';

const DashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  })
);

const DashboardLayoutWrapper = experimentalStyled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 256,
    },
  })
);

const DashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
});

const DashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
});

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMobileNavOpen, setMobileNavOpen] = React.useState(false);

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar
        onMobileNavOpen={() => setMobileNavOpen(true)}
      />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
