import { Box, Container, Grid, Pagination } from '@material-ui/core';
import Layout from '../layout';
import NotificationCard from '../notificationcard';
import MainLayout from '../layouts/main.layout';

const NotificationPage = ({
  notifications,
}: {
  notifications: NotificationResponse[];
}) => (
  <MainLayout>
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
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </Layout>
  </MainLayout>
);

export default NotificationPage;
