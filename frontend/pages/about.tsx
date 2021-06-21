import Link from 'next/link';
import Layout from '../components/Layout';

import { Tutor } from '../interfaces';
import { getTutors } from '../services/get.service';

type Props = {
  tutors: Tutor[];
};
const AboutPage = ({ tutors }: Props) => (
  <Layout title="RingsListings: All Listings" tutors={tutors}>
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export async function getServerSideProps() {
  const allTutors = await getTutors();

  return {
    props: {
      tutors: allTutors.data,
    },
  };
}

export default AboutPage;
