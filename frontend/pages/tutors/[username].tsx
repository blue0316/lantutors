import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import Layout from '../../components/Layout';

import {
  getTutors,
  getStudent,
  getStudents,
} from '../../services/get.service';

// import { useStyles } from '../../styles/listing.styles';
import { Tutor } from '../../interfaces';
import { getTutor } from '../../services/get.service';

type Props = {
  tutor: Tutor;
  tutors: Tutor[];
};

function TutorPage({ tutor, tutors }: Props) {
  // const classes = useStyles();
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={`Lantutors:  ${tutor.username}`} tutors={tutors}>
      {tutor.email && <h1>Detail for {tutor.email}</h1>}
      {tutor.id && <p>ID: {tutor.id}</p>}
      {tutor.username && <p>Username: {tutor.username}</p>}
    </Layout>
  );
}

// This also gets called at build time
export const getServerSideProps: GetServerSideProps = async ({
  params,
}) => {
  const tutor = await getTutor(params && params.username);
  const tutors = await getTutors();

  return {
    props: {
      tutor: tutor.data,
      tutors: tutors.data,
    },
  };
};

export default TutorPage;
