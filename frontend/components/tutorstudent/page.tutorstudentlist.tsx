import Router from 'next/router';
import { Container, Box, Button, Grid } from '@material-ui/core';

import Layout from '../layouts/base.layout';
import DashBoardLayout from '../layouts/dashboard.layout';

import TutorStudentList from './list.tutorstudent';

type Props = {
  tutorStudent: { tutor: string; students: string[] };
};

const TutorStudentListPage = ({ tutorStudent }: Props) => (
  <DashBoardLayout>
    <Layout title="Lantutors:  Students">
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <TutorStudentList
                  students={
                    tutorStudent?.students && tutorStudent.students
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3,
            }}
          >
            <Button onClick={() => Router.back()}>Go Back</Button>
          </Box>
        </Container>
      </Box>
    </Layout>
  </DashBoardLayout>
);

export default TutorStudentListPage;
