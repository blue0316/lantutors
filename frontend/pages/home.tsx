import TutorStudentPage from '../components/tutorstudent/page.tutorstudent';

import { reduceStudents } from '../utils/reducers';
import {
  getRawCommonStudents,
  getTutors,
} from '../services/get.service';

const Home = ({
  commonStudents,
  tutors,
}: {
  commonStudents: CommonStudentsApi[];
  tutors: Tutor[];
}) => (
  <TutorStudentPage commonStudents={commonStudents} tutors={tutors} />
);

export async function getServerSideProps() {
  const allTutors = await getTutors();
  const allCommon = await getRawCommonStudents();

  return {
    props: {
      commonStudents: reduceStudents(allCommon.data),
      tutors: allTutors.data,
    },
  };
}
export default Home;
