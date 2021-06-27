import Router from 'next/router';
import { Box, Button, Container, Grid } from '@material-ui/core';
import Layout from '../layouts/base.layout';
import NotificationCard from './card.notification';
import DashboardLayout from '../layouts/main.layout';

const NotificationPage = ({
  notifications,
}: {
  notifications: NotificationResponse[];
}) => (
  <DashboardLayout>
    <Layout title="Lantutors: All Notifications">
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {notifications &&
                notifications.map((notification) => (
                  <Grid
                    item
                    key={notification.id}
                    lg={4}
                    md={6}
                    xs={12}
                  >
                    <NotificationCard notification={notification} />
                  </Grid>
                ))}
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
    </Layout>
  </DashboardLayout>
);

export default NotificationPage;
