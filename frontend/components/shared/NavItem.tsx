import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useRouter } from 'next/router';
// import useLocation from 'next/router'

import { Button, ListItem } from '@material-ui/core';

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
          color: 'text.secondary',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          // color: 'primary.main',
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

export default NavItem;
