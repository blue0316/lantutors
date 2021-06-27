/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React from 'react';
import { useRouter } from 'next/router';
import { createStyles, makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Typography,
} from '@material-ui/core';

import {
  initialize,
  capitalize,
  randomColor,
} from '../../utils/initialize';

import { getCommonStudentsBySearchParam } from '../../services/get.service';

import { useSelected } from '../../context/selected.context';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
    },
  })
);

const CommonStudentList = ({ students }: { students: string[] }) => {
  const {
    commonData,
    selectedData,
    loading,
    setLoading,
    params,
    loadCommonStudents,
  } = useSelected();
  console.log('second', students);
  const classes = useStyles();
  const router = useRouter();

  const [common, setCommon] = React.useState<string[]>(students);

  React.useEffect(() => {
    if (commonData) {
      setCommon(commonData);
    }
  }, [commonData, selectedData]);

  const loadReset = async (lparams: any) => {
    setLoading(true);
    const response = await getCommonStudentsBySearchParam(
      // @ts-ignore
      lparams.map((data) => data.tutor !== 'false' && data.entry)
    );
    if (response && response.data) {
      setLoading(false);
      console.log('RELOADED');
      setCommon(response.data.students);
    }
  };

  const beta = (
    <Typography variant="caption">
      Initially, the resulting list will be of students common to and
      only to the tutors `checked`.{' '}
    </Typography>
  );

  const error = (
    <Typography variant="caption">
      However, we're still working on getting this filter to reload on
      each checkbox `unchecked` event.
    </Typography>
  );

  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        {' '}
        <Typography variant="h6">
          `Check` Any of the Tutors Above
        </Typography>
        <Typography variant="caption">
          Initially, the resulting list will be of students common to
          and only to the tutors `checked`.{' '}
        </Typography>
      </Box>

      <List dense className={classes.root}>
        {common && common.length === 0
          ? error
          : common &&
            common.map((student) => {
              const localId = `common-${initialize(student)}`;
              return (
                <ListItem
                  key={student}
                  button
                  onClick={() => {
                    router.push({
                      pathname: `/students/${encodeURIComponent(
                        student
                      )}`,
                    });
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      style={{
                        backgroundColor: randomColor(),
                      }}
                    >
                      {capitalize(student)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText id={student} primary={student} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      // @ts-ignore
                      onChange={handleToggle(student)}
                      // @ts-ignore
                      checked={checked.indexOf(student) !== -1}
                      inputProps={{ 'aria-labelledby': localId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
      </List>
    </>
  );
};

export default CommonStudentList;
