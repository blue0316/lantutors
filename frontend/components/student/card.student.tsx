import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { createStyles, makeStyles } from '@material-ui/styles';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import clsx from 'clsx';

import {
  initialize,
  randomColor,
  capitalize,
} from '../../utils/initialize';
import { useStudents } from '../../context/students.context';

dayjs.extend(relativeTime);

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7',
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: '8px',
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: '#028102',
      '&:hover': {
        backgroundColor: '#008000',
      },
    },
    fabProgress: {
      color: '#028102',
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: '#028102',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

const StudentCard = ({ student }: { student: Student }) => {
  const {
    handleSuspend,
    suspendedStudent,
    setSuspendedStudent,
    studentsData,
    loadStudents,
    suspending,
  } = useStudents();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  if (!loading) {
    setSuccess(false);
    setLoading(true);
    timer.current = window.setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 2000);
  }

  React.useEffect(() => {
    if (suspending) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [suspending]);

  React.useEffect(
    () => () => {
      clearTimeout(timer.current);
    },
    []
  );

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'left',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Avatar
            style={{
              backgroundColor: randomColor(),
            }}
          >
            {capitalize(student.email)}
          </Avatar>

          <Typography color="textPrimary" gutterBottom variant="h3">
            {initialize(student.email)}
          </Typography>
          <Box
            sx={{
              alignItems: 'left',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography color="textSecondary" variant="body1">
              ID:
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {student.id}
            </Typography>
          </Box>

          <Box
            sx={{
              alignItems: 'left',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography color="textSecondary" variant="body1">
              Email:
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {student.email}
            </Typography>
          </Box>

          <Box
            sx={{
              alignItems: 'left',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography color="textSecondary" variant="body1">
              Record Last Updated:
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {dayjs(student.updatedAt).fromNow()}
            </Typography>
          </Box>

          <Box
            sx={{
              alignItems: 'left',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography color="textSecondary" variant="body1">
              Enrolled Since:
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {dayjs(student.createdAt).fromNow()}
            </Typography>
          </Box>

          <Box
            sx={{
              alignItems: 'left',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography color="textSecondary" variant="body1">
              Suspended Status:
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {student.suspended.toString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={loading}
            onClick={() => {
              setSuspendedStudent(student.email);
            }}
          >
            Accept terms
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              className={classes.buttonProgress}
            />
          )}
        </div>
      </CardActions>
    </Card>
  );
};

export default StudentCard;
