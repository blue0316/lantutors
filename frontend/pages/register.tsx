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

import { useRegister } from '../context/register.context';

const RegisterPage = () => {
  const { students, setStudents, handleCancel, handleSubmit } =
    useRegister();
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
              <form id="register" onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Type emails of students you want to register.
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Please separate emails with a comma.
                  </Typography>
                </Box>

                <TextField
                  id="students"
                  label="Students emails to register"
                  multiline
                  rows={8}
                  variant="outlined"
                  fullWidth
                  value={students}
                  onChange={(e) => setStudents(e.target.value)}
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
                      form="register"
                      type="submit"
                      fullWidth
                      size="large"
                      variant="contained"
                    >
                      Register
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

export default RegisterPage;
