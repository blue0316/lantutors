import {
  getTutors,
  getCommonStudents,
  getRawCommonStudents,
  getRawStudents,
} from '../../services/get.service';

import StudentsPage from '../../components/students/page.students';

type Props = {
  students: Student[];
};

const StudentsPageMain = ({ students }: Props) => (
  <StudentsPage students={students} />
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

export default StudentsPageMain;
