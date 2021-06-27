/* eslint-disable no-console */
import React from 'react';
import { Box, Container } from '@material-ui/core';
import {
  getTutors,
  getStudents,
  getCommonStudents,
  getRawCommonStudents,
  getRawStudents,
  getCommonStudentsBySearchParam,
} from '../services/get.service';
import StudentsTable from '../components/studenttable';
import CommonList from '../components/commonlist';
import Layout from '../components/layouts/base.layout';
import SubHeader from '../components/subheader';
import DashboardLayout from '../components/layouts/dashboard.layout';

import { useSelected } from '../context/selected.context';

const CommonStudentsPage = ({
  students,
  tutors,
}: {
  students: Student['email'][];
  tutors: Tutor[];
}) => {
  const {
    commonData,
    setCommonData,
    selectedData,
    setSelectedData,
    loadCommonStudents,
    loading,
    params,
  } = useSelected();

  const [common, setCommon] =
    React.useState<Student['email'][]>(students);

  React.useEffect(() => {
    if (commonData) {
      setCommon(commonData);
    }
  }, [commonData]);

  // @ts-ignore
  const localArr = (paramsVar) =>
    // @ts-ignore
    paramsVar.map((data) => data.tutor !== 'false' && data.entry);

  const loadLocalCommon = () => {
    const response = getCommonStudentsBySearchParam();
    // @ts-ignore
    if (response && response.data) {
      // @ts-ignore
      setCommon(response.data);
    }
  };

  React.useEffect(() => {
    // @ts-ignore
    params.map((data) => data.tutor !== 'false' && data.entry);
  }, [params]);

  React.useEffect(() => {
    if (params.length === 0) {
      loadLocalCommon();
    }
  }, [params]);

  console.log('commonData', commonData);
  console.log('selectedData', selectedData);
  console.log('params', params);
  console.log('localArr', localArr);

  // @ts-ignore
  return (
    <DashboardLayout>
      <Layout title="Lantutors: All Students">
        <SubHeader tutors={tutors} />
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
                <CommonList students={common} />
              </Box>
            </Container>
          </Box>
        </>
      </Layout>
    </DashboardLayout>
  );
};

export async function getServerSideProps() {
  const tutors = await getTutors();
  const allCommon = await getCommonStudents();
  const rawCommon = await getRawCommonStudents();
  const students = await getCommonStudentsBySearchParam();

  return {
    props: {
      tutors: tutors.data,
      students: students.data,
    },
  };
}

export default CommonStudentsPage;
