import Link from 'next/link';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  useMediaQuery,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

import {
  AtSign as NotificationsIcon,
  Users as Students,
  Send,
  PlusCircle as Register,
} from 'react-feather';

import { randomColor } from '../../utils/initialize';

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
          <Avatar
            style={{
              backgroundColor: randomColor(),
            }}
          >
            LT
          </Avatar>
        </Link>
        <Box sx={{ flexGrow: 1 }} />

        {lgUp && (
          <>
            <Link href="/students">
              <Box sx={{ cursor: 'pointer' }}>
                <Students />
              </Box>
            </Link>
            <Box sx={{ flexGrow: 0.2 }} />
            <Link href="/notifications">
              <Box sx={{ cursor: 'pointer' }}>
                <NotificationsIcon />
              </Box>
            </Link>
            <Box sx={{ flexGrow: 0.2 }} />
            <Link href="/notify">
              <Box sx={{ cursor: 'pointer' }}>
                <Send />
              </Box>
            </Link>
            <Box sx={{ flexGrow: 0.2 }} />
            <Link href="/register">
              <Box sx={{ cursor: 'pointer' }}>
                <Register />
              </Box>
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
