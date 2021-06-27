import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import {
  Home as HomeIcon,
  Plus as AddIcon,
  AtSign as NotificationsIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as Students,
  Send,
} from 'react-feather';

import NavItem from '../shared/navitem';

import { useTutor } from '../../context/tutor.context';

export const items = [
  {
    href: '/home',
    icon: <HomeIcon />,
    title: 'Home',
  },
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
  {
    href: '/notify',
    icon: <Send />,
    title: 'Post',
  },
  {
    href: '/login',
    title: 'Login',
    icon: <UserIcon />,
  },
];

const DashboardSidebar = ({
  onMobileClose,
  openMobile = false,
}: {
  onMobileClose?: () => void;
  openMobile?: boolean;
}) => {
  const router = useRouter();
  const { email } = useTutor();
  const lgUp = useMediaQuery('(min-width:900px)');
  const lgDown = useMediaQuery('(max-width:898px)');

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [router.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Link href="/home">
          <a>
            <Avatar
              src={email.split('@')[0]}
              sx={{
                cursor: 'pointer',
                width: 64,
                height: 64,
              }}
            />
          </a>
        </Link>

        <Typography color="textPrimary" variant="h5">
          {email}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          Tutor {email.split('@')[0]}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      {lgDown && (
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      )}

      {lgUp && (
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)',
            },
          }}
        >
          {content}
        </Drawer>
      )}
    </>
  );
};

export default DashboardSidebar;
