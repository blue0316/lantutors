import { GetServerSideProps } from 'next';

import TutorStudentListPage from '../../components/tutorstudent/page.tutorstudentlist';

import {
  getTutors,
  getCommonStudentsByTutor,
} from '../../services/get.service';

type Props = {
  tutorStudents: CommonStudentsApi;
};

const TutorStudentsListsPage = ({ tutorStudents }: Props) => (
  <TutorStudentListPage tutorStudent={tutorStudents} />
);

export const getServerSideProps: GetServerSideProps = async ({
  params,
}) => {
  const tutorStudent = await getCommonStudentsByTutor(
    params && params.tutor
  );

  const tutors = await getTutors();
  return {
    props: {
      tutors: tutors.data,
      tutorStudents: tutorStudent.data,
    },
  };
};

export default TutorStudentsListsPage;
