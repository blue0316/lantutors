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

import { getStudent } from '../../services/get.service';
import { useStudents } from '../../context/students.context';

dayjs.extend(relativeTime);

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
    setSuspendedStudent,
    suspendedStudent,
    suspendedStudentData,
    suspending,
  } = useStudents();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const [studentData, setStudentData] =
    React.useState<Student>(student);

  React.useEffect(() => {
    if (suspendedStudentData) {
      setStudentData(suspendedStudentData);
    }
  }, [suspendedStudentData]);

  React.useEffect(() => {
    if (student) {
      setStudentData(student);
    }
  }, [student]);

  React.useEffect(() => {
    if (suspending) {
      setLoading(true);
      setSuccess(false);
    } else {
      setLoading(false);
      setSuccess(true);
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
            display: 'flex',
            flexDirection: 'column',
            pb: 3,
          }}
        >
          <Box
            sx={{
              alignItems: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              pb: 3,
            }}
          >
            <Avatar
              style={{
                backgroundColor: randomColor(),
              }}
            >
              {capitalize(studentData.email)}
            </Avatar>
            <Typography color="textPrimary" gutterBottom variant="h3">
              {initialize(studentData.email)}
            </Typography>
          </Box>

          <Box
            sx={{
              alignItems: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              pb: 2,
            }}
          >
            <Typography color="textSecondary" variant="body1">
              ID:
            </Typography>
            <Typography color="textPrimary" variant="body1">
              {studentData.id}
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              alignItems: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              pt: 2,
              pb: 2,
            }}
          >
            <Typography color="textSecondary" variant="body1">
              Email:
            </Typography>
            <Typography color="textPrimary" variant="body1">
              {studentData.email}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              alignItems: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              pt: 2,
              pb: 2,
            }}
          >
            <Typography color="textSecondary" variant="body1">
              Record Last Updated:
            </Typography>
            <Typography color="textPrimary" variant="body1">
              {dayjs(studentData.updatedAt).fromNow()}
            </Typography>
          </Box>

          <Divider />

          <Box
            sx={{
              alignItems: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              pt: 2,
              pb: 2,
            }}
          >
            <Typography color="textSecondary" variant="body1">
              Enrolled Since:
            </Typography>
            <Typography color="textPrimary" variant="body1">
              {dayjs(studentData.createdAt).fromNow()}
            </Typography>
          </Box>

          <Divider />

          <Box
            sx={{
              alignItems: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              pt: 2,
              pb: 2,
            }}
          >
            <Typography color="textSecondary" variant="body1">
              Suspended Status:
            </Typography>
            <Typography color="textPrimary" variant="body1">
              {studentData.suspended.toString().toUpperCase()}
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
              setSuspendedStudent(studentData.email);
            }}
          >
            {studentData.suspended === true ? 'Unsuspend' : 'Suspend'}
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
