import Router from 'next/router';
import {
  Container,
  Box,
  Button,
  Grid,
  Pagination,
} from '@material-ui/core';

import Layout from '../layouts/base.layout';
import DashBoardLayout from '../layouts/dashboard.layout';

import StudentCard from './card.student';
import { initialize } from '../../utils/initialize';

const StudentCardPage = ({ student }: { student: Student }) => (
  <DashBoardLayout>
    <Layout
      title={`Lantutors: Student ${initialize(
        student.email
      )}'s Students`}
    >
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
              <Grid item md={10} sm={12} xs={12}>
                <StudentCard student={student} />
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

export default StudentCardPage;
