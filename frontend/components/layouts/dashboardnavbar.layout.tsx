import Link from 'next/link';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  useMediaQuery,
  Typography,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

import {
  AtSign as NotificationsIcon,
  Users as Students,
  Plus as AddIcon,
  Send,
} from 'react-feather';

import Logo from '../shared/Logo';
import TutorLogo from '../shared/TutorLogo';
import NavItem from '../shared/NavItem';

const DashboardNavbar = ({
  onMobileNavOpen,
}: {
  onMobileNavOpen: () => void;
}) => {
  const lgUp = useMediaQuery('(min-width:900px)');
  const lgDown = useMediaQuery('(max-width:898px)');
  const items = [
    {
      href: '/students',
      icon: <Students />,
      title: 'Students',
    },
    {
      href: '/notifications',
      icon: <NotificationsIcon />,
      title: 'Notifications',
    },
  ];

  return (
    <AppBar elevation={0}>
      <Toolbar>
        <Link href="/">
          <Logo />
        </Link>
        <Box sx={{ flexGrow: 1 }} />

        {lgUp && (
          <>
            <Link href="/students">
              <Students />
            </Link>
            <Box sx={{ flexGrow: 0.2 }} />
            <Link href="/notifications">
              <NotificationsIcon />
            </Link>
            <Box sx={{ flexGrow: 0.2 }} />
            <Link href="/notify">
              <Send />
            </Link>
            <Box sx={{ flexGrow: 0.2 }} />
            <IconButton color="inherit" onClick={onMobileNavOpen}>
              <MenuIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default DashboardNavbar;
