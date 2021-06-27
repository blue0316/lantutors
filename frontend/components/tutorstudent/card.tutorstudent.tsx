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
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { User as UserIcon, Users as Students } from 'react-feather';
import TutorStudentList from './list.tutorstudent';

import { initialize, randomColor } from '../../utils/initialize';

import { useTutor } from '../../context/tutor.context';

dayjs.extend(relativeTime);

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    marginRight: '16px',
  },
  heroContent: {
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
    padding: '48px',
  },
}));

const TutorStudentCard = ({
  commonStudent,
}: {
  commonStudent: CommonStudentsApi;
}) => {
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
        <TutorStudentList students={commonStudent.students} />
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
            <Students />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {commonStudent.students.length} students
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <UserIcon />
            <Link
              href={`/tutorstudent/${encodeURIComponent(
                commonStudent.tutor
              )}`}
            >
              {email ? (
                <Typography
                  color="textSecondary"
                  display="inline"
                  sx={{ pl: 1 }}
                  variant="body2"
                >
                  @View your Students
                </Typography>
              ) : (
                <Typography
                  color="textSecondary"
                  display="inline"
                  sx={{ pl: 1 }}
                  variant="body2"
                >
                  @View @tutor{initialize(commonStudent.tutor)}'s
                  Students
                </Typography>
              )}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default TutorStudentCard;
