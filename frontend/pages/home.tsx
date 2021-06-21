import Layout from '../components/Layout';
import CommonCard from '../components/CommonCard';
import { CommonStudents, Tutor } from '../interfaces';
import {
  getCommonStudents,
  getTutors,
} from '../services/get.service';

type Props = {
  commonStudents: CommonStudents[];
  tutors: Tutor[];
};

const Home = ({ commonStudents, tutors }: Props) => {
  return (
    <Layout title="RingsListings: All Listings" tutors={tutors}>
      <main>
        <CommonCard commonStudents={commonStudents} />
      </main>
    </Layout>
  );
};

export async function getServerSideProps() {
  const allTutors = await getTutors();
  const allCommon = await getCommonStudents();

  return {
    props: {
      commonStudents: allCommon.data,
      tutors: allTutors.data,
    },
  };
}
export default Home;
