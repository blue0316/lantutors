import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import {
  Home as HomeIcon,
  AtSign as NotificationsIcon,
  User as UserIcon,
  Users as Students,
  UserPlus as CommonStudents,
  Send,
  PlusCircle as Register,
} from 'react-feather';

import { useTutor } from '../../context/tutor.context';
import {
  initialize,
  capitalize,
  randomColor,
} from '../../utils/initialize';

const NavItem = ({
  href,
  icon,
  title,
  ...children
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const router = useRouter();

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 0,
      }}
      {...children}
    >
      <Button
        sx={{
          cursor: 'pointer',
          color: 'text.secondary',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          '& svg': {
            mr: 1,
          },
        }}
        onClick={() => router.push({ pathname: href })}
      >
        {icon && icon}
        <span>{title}</span>
      </Button>
    </ListItem>
  );
};

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
    href: '/register',
    icon: <Register />,
    title: 'Register Students',
  },
  {
    href: '/commonstudents',
    icon: <CommonStudents />,
    title: 'Common Students (beta)',
  },
  {
    href: '/',
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

  React.useEffect(() => {
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
        {email ? (
          <Link href="/home">
            <a>
              <Avatar
                style={{ backgroundColor: randomColor() }}
                sx={{
                  cursor: 'pointer',
                  width: 64,
                  height: 64,
                }}
              >
                {capitalize(email)}
              </Avatar>
            </a>
          </Link>
        ) : (
          <Link href="/home">
            <a>
              <Avatar
                style={{ backgroundColor: randomColor() }}
                sx={{
                  cursor: 'pointer',
                  width: 64,
                  height: 64,
                }}
              />
            </a>
          </Link>
        )}

        <Typography color="textPrimary" variant="h5">
          {email}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          Tutor {initialize(email)}
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
