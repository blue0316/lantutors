import Router from 'next/router';
import { Container, Button, Box } from '@material-ui/core';

import Layout from '../layouts/base.layout';

import DashboardLayout from '../layouts/dashboard.layout';
import SubHeader from '../subheader';
import CommonStudentList from './list.commonstudent';

type Props = {
  commonStudents: string[];
  tutors: Tutor[];
};

const CommonStudentPage = ({ commonStudents, tutors }: Props) => (
  <>
    <DashboardLayout>
      <Layout title="Lantutors: Common Students">
        <SubHeader tutors={tutors} />
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3,
          }}
        >
          <Container maxWidth={false}>
            <Box sx={{ pt: 3 }}>
              <CommonStudentList students={commonStudents} />
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
    </DashboardLayout>
  </>
);

export default CommonStudentPage;
