import { Box, Container } from '@material-ui/core';

import StudentsTable from './table.students';

import Layout from '../layouts/base.layout';
import DashboardLayout from '../layouts/dashboard.layout';

type Props = {
  students: Student[];
};
const StudentsPage = ({ students }: Props) => (
  <DashboardLayout>
    <Layout title="Lantutors: All Students">
      <>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3,
          }}
        >
          <Container maxWidth={false}>
            <Box sx={{ pt: 3 }}>
              <StudentsTable students={students} />
            </Box>
          </Container>
        </Box>
      </>
    </Layout>
  </DashboardLayout>
);

export default StudentsPage;
