import { GetServerSideProps } from 'next';

import Layout from '../../components/layouts/base.layout';

import StudentCardPage from '../../components/student/page.student';

import {
  getTutors,
  getStudent,
  getStudents,
} from '../../services/get.service';

const StudentPage = ({
  student,
  errors,
}: {
  student: Student;
  errors: string;
}) => {
  if (errors) {
    return (
      <Layout title={`Lantutors: Error ${errors}`}>
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return <StudentCardPage student={student} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}) => {
  const student = await getStudent(params && params.student);

  const tutors = await getTutors();

  return {
    props: {
      tutors: tutors.data,
      student: student.data,
    },
  };
};

export default StudentPage;
