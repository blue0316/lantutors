import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Theme } from '@material-ui/core/styles';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

import {
  Home as HomeIcon,
  Plus as AddIcon,
  AtSign as NotificationsIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as Students,
} from 'react-feather';
import {
  initialize,
  capitalize,
  randomColor,
} from '../utils/initialize';
import CommonList from './commonlist';

import { useTutor } from '../context/tutor.context';

dayjs.extend(relativeTime);

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    marginRight: '16px',
  },
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    padding: '48px 0px 36px',
  },
  heroButtons: {
    marginTop: '30px',
  },
  cardGrid: {
    paddingTop: '48px',
    paddingBottom: '48px',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    // backgroundColor: theme.palette.background.paper,
    padding: '48px',
  },
}));

const CommonCard = ({
  commonStudent,
}: {
  commonStudent: CommonStudentsApi;
}) => {
  const classes = useStyles();
  const router = useRouter();

  const { email } = useTutor();
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 3,
          }}
        >
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            Tutor {initialize(commonStudent.tutor)}
          </Typography>

          <Avatar
            style={{
              backgroundColor: randomColor(),
            }}
          />
        </Box>
        <CommonList students={commonStudent.students} />
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            {/* <AccessTimeIcon color="action" /> */}
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {commonStudent.students.length} students assigned to
              @tutor{initialize(commonStudent.tutor)}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            {email && (
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  router.push({
                    pathname: `/tutorstudents/${encodeURIComponent(
                      commonStudent.tutor && commonStudent.tutor
                    )}`,
                  });
                }}
              >
                Send a messsage to your students
              </Button>
            )}

            <NotificationsIcon />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              View
            </Typography>
            {/* <Button
              size="small"
              color="primary"
              onClick={() => {
                router.push({
                  pathname: `/tutorstudents/${encodeURIComponent(
                    commonStudent.tutor
                  )}`,
                });
              }}
            >
              Send a messsage to your students
            </Button> */}
            <Link
              href={`/tutorstudents/${encodeURIComponent(
                commonStudent.tutor
              )}`}
            >
              <a>View</a>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default CommonCard;
