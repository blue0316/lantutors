import { GetStaticProps } from 'next';
import Link from 'next/link';

import { Tutor, Student } from '../../interfaces';

import Layout from '../../components/Layout';
import List from '../../components/List';

import { getTutors, getStudents } from '../../services/get.service';

type Props = {
  students: {
    id: Student['id'];
    studentName: Student['username'];
  }[];
  tutors: Tutor[];
};

const WithStaticProps = ({ students, tutors }: Props) => (
  <Layout title="Lantutors: All Students" tutors={tutors}>
    <h1>Students List</h1>
    <p>You are currently on: /users</p>
    <List students={students} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.

  const students = await getStudents();
  const tutors = await getTutors();
  return {
    props: {
      tutors: tutors.data,
      students: students.data.students,
    },
  };
};

export default WithStaticProps;
