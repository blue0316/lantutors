import React from 'react';

import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

import {
  Toolbar,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

import { initialize } from '../utils/initialize';

import { useTutor } from '../context/tutor.context';
import { useSelected } from '../context/selected.context';

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    borderBottom: `1px solid '#000`,
    backgroundColor: '#2d2d2d',
    display: 'flex',
    justifyContent: 'space-between',
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarMain: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    backgroundColor: '#525050',
    color: '#fff',
  },
  toolbarLink: {
    padding: '15px',
    flexShrink: 0,
  },
  appbarPromotion: {
    backgroundColor: '#2d2d2d',
    color: '#fff',
  },
  toolbarPromotion: {
    padding: '0px',
    minHeight: 50,
  },
}));

type Props = {
  tutors: Tutor[];
};

const Header = ({ tutors }: Props) => {
  const classes = useStyles();
  const router = useRouter();
  const { loggedIn, email } = useTutor();
  const { selectedData, setSelectedData, handleChange } =
    useSelected();

  return (
    <>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {tutors &&
          tutors.map((tutor) => (
            <>
              AWEAGWAEGAGAEGAEGAGE
              {/* <Typography
                variant="body2"
                noWrap
                className={classes.toolbarLink}
                style={{ cursor: 'pointer' }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      // @ts-ignore
                      checked={selectedData[tutor.email]}
                      onChange={handleChange}
                      name={tutor.email}
                    />
                  }
                  label={initialize(tutor.email)}
                />
              </Typography> */}
            </>
          ))}
      </Toolbar>
    </>
  );
};

export default Header;
