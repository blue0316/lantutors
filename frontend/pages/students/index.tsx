import { Box, Container } from '@material-ui/core';
import {
  getTutors,
  getStudents,
  getCommonStudents,
  getRawCommonStudents,
  getRawStudents,
} from '../../services/get.service';
import StudentsTable from '../../components/studenttable';

import Layout from '../../components/layouts/base.layout';
import DashboardLayout from '../../components/layouts/dashboard.layout';

type Props = {
  tutors: Tutor[];
  students: Student[];
};
const StudentsPage = ({ tutors, students }: Props) => (
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

export async function getServerSideProps() {
  const allTutors = await getTutors();
  const allCommon = await getCommonStudents();
  const rawCommon = await getRawCommonStudents();
  const students = await getRawStudents();

  return {
    props: {
      commonStudents: allCommon.data,
      rawCommonStudents: rawCommon.data,
      tutors: allTutors.data,
      students: students.data,
    },
  };
}

export default StudentsPage;
