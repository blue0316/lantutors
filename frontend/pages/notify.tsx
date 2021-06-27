import React from 'react';
import { GetServerSideProps } from 'next';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';

import Layout from '../components/layouts/base.layout';

import { getTutors } from '../services/get.service';
import { useNotification } from '../context/notification.context';

const NotifyPage = ({ tutors }: { tutors: Tutor[] }) => {
  const {
    notification,
    setNotification,
    handleCancel,
    handleSubmit,
  } = useNotification();
  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="sm">
          <form id="notifications" onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography color="textPrimary" variant="h2">
                Post a Notification
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                By default, your post will notify all students
                registered to you. However, you can @mention any
                student to include them in your broadcast.
              </Typography>
            </Box>

            <TextField
              id="notification"
              label="Notification message"
              multiline
              rows={8}
              defaultValue="Default Value"
              variant="outlined"
              fullWidth
              value={notification}
              onChange={(e) => setNotification(e.target.value)}
            />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  form="notifications"
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                >
                  Post
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const allTutors = await getTutors();
  return {
    props: {
      tutors: allTutors.data,
    },
  };
};

export default NotifyPage;
