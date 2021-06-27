import React from 'react';
import Router from 'next/router';

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';

import DashboardLayout from '../components/layouts/dashboard.layout';

import { getTutors } from '../services/get.service';
import { useNotification } from '../context/notification.context';

const NotifyPage = () => {
  const {
    notification,
    setNotification,
    handleCancel,
    handleSubmit,
  } = useNotification();
  return (
    <DashboardLayout>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <Grid container maxWidth="sm">
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
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3,
            }}
          >
            <Button onClick={() => Router.back()}>Go Back</Button>
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default NotifyPage;
