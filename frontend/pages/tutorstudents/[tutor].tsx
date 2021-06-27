import { GetServerSideProps } from 'next';

import TutorStudentListPage from '../../components/tutorstudent/page.tutorstudentlist';

import {
  getTutors,
  getCommonStudentsByTutor,
} from '../../services/get.service';

type Props = {
  tutorStudent: CommonStudentsApi;
  tutors: Tutor[];
};

const TutorStudentsListsPage = ({ tutorStudent, tutors }: Props) => (
  <TutorStudentListPage tutorStudent={tutorStudent} tutors={tutors} />
);

export const getServerSideProps: GetServerSideProps = async ({
  params,
}) => {
  const tutorStudent = await getCommonStudentsByTutor(
    params && params.email
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
