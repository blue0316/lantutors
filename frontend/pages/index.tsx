import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@material-ui/core';

import MainLayout from '../components/layouts/main.layout';
import Layout from '../components/layouts/base.layout';

import { getTutors } from '../services/get.service';

import { useTutor } from '../context/tutor.context';

const IndexPage = ({ tutors }: { tutors: Tutor[] }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSignIn,
    loading,
  } = useTutor();

  return (
    <MainLayout>
      <Layout title="Lantutors: Sign In">
        <Box
          sx={{
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            pt: 8,
          }}
        >
          <Container maxWidth="sm">
            <form id="register" onSubmit={handleSignIn}>
              <Box sx={{ mb: 3, pt: 3 }}>
                <Typography color="textPrimary" variant="h2">
                  Welcome to Lantutors
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Use your email to acces your students.
                </Typography>
              </Box>

              <TextField
                id="email"
                fullWidth
                label="Email Address"
                margin="normal"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                variant="outlined"
              />
              <TextField
                fullWidth
                id="password"
                label="Password"
                margin="normal"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                variant="outlined"
              />

              <Box sx={{ py: 2 }}>
                <Button
                  form="register"
                  color="primary"
                  disabled={loading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in
                </Button>
              </Box>
            </form>
          </Container>
        </Box>
      </Layout>
    </MainLayout>
  );
};

export async function getServerSideProps() {
  const allTutors = await getTutors();
  // const allCommon = await getRawCommonStudents();

  return {
    props: {
      // commonStudents: reduceStudents(allCommon.data),
      tutors: allTutors.data,
    },
  };
}

export default IndexPage;
