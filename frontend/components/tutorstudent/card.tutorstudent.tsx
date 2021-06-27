import React from 'react';
import Link from 'next/link';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {
  User as UserIcon,
  Users as Students,
  ArrowRightCircle as View,
} from 'react-feather';

import TutorStudentList from './list.tutorstudent';
import { initialize, randomColor } from '../../utils/initialize';
import { useTutor } from '../../context/tutor.context';

dayjs.extend(relativeTime);

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
            <View />
            <Link
              href={`/tutorstudent/${encodeURIComponent(
                commonStudent.tutor
              )}`}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
              >
                {email ? (
                  <Typography
                    color="textSecondary"
                    display="inline"
                    sx={{ pl: 1 }}
                    variant="body2"
                  >
                    Your Students
                  </Typography>
                ) : (
                  <Typography
                    color="textSecondary"
                    display="inline"
                    sx={{ pl: 1 }}
                    variant="body2"
                  >
                    @Tutor{initialize(commonStudent.tutor)}'s Students
                  </Typography>
                )}
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default TutorStudentCard;
