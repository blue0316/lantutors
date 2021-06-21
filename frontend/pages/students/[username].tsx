import { GetServerSideProps } from 'next';

import { User, Student, Tutor } from '../../interfaces';
import { sampleUserData } from '../../utils/sample-data';
import Layout from '../../components/Layout';
import ListDetail from '../../components/ListDetail';

import {
  getTutors,
  getStudent,
  getStudents,
} from '../../services/get.service';

type Props = {
  student?: Student;
  errors?: string;
  tutors: Tutor[];
};

const StudentPage = ({ student, errors, tutors }: Props) => {
  if (errors) {
    console.log(student);
    return (
      <Layout title={`Lantutors: Error ${errors}`} tutors={tutors}>
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${
        student ? student.username : 'User Detail'
      } | Lantutors + Xs Example`}
      tutors={tutors}
    >
      {student && <ListDetail student={student} />}
    </Layout>
  );
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
// export const getServerSideProps: GetServerSideProps = async ({
//   params,
// }) => {
//   try {
//     const username = params && params.username.toString();
//     const student = await getStudent(username || 'elias');
//     const tutors = await getTutors();
//     console.log(student.data);
//     // const item = sampleUserData.find(
//     //   (data) => data.id === Number(id)
//     // );
//     // By returning { props: item }, the StaticPropsDetail component
//     // will receive `item` as a prop at build time
//     return { props: { student: student.data, tutors: tutors.data } };
//   } catch (err) {
//     return { props: { errors: err.message } };
//   }
// };

export const getServerSideProps: GetServerSideProps = async ({
  params,
}) => {
  const student = await getStudent(params && params.username);

  const tutors = await getTutors();

  return {
    props: {
      tutors: tutors.data,
      student: student.data,
    },
  };
};

export default StudentPage;
