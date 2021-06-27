import React from 'react';
import {
  getTutors,
  getCommonStudentsBySearchParam,
} from '../services/get.service';

import CommonStudentPage from '../components/commonstudent/page.commonstudent';

import { useSelected } from '../context/selected.context';

const CommonStudentsPage = ({
  students,
  tutors,
}: {
  students: string[];
  tutors: Tutor[];
}) => {
  const { commonData, selectedData, loading, params } = useSelected();

  const [common, setCommon] = React.useState<string[]>(students);

  React.useEffect(() => {
    if (commonData) {
      setCommon(commonData);
    }
  }, [commonData]);

  // @ts-ignore
  return <CommonStudentPage students={common} tutors={tutors} />;
};

export async function getServerSideProps() {
  const tutors = await getTutors();
  const students = await getCommonStudentsBySearchParam();

  return {
    props: {
      tutors: tutors.data,
      students: students.data.students,
    },
  };
}

export default CommonStudentsPage;
