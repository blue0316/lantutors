import { GetServerSideProps } from 'next';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import Layout from '../components/layouts/base.layout';
import NotificationCard from '../components/notificationcard';
import MainLayout from '../components/layouts/main.layout';

import { getNotifications, getTutors } from '../services/get.service';
import { reduceNotifications } from '../utils/reducers';

type Props = {
  notifications: NotificationResponse[];
  tutors: Tutor[];
};

const NotificationsPage = ({ notifications, tutors }: Props) => (
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

export const getServerSideProps: GetServerSideProps = async () => {
  const notifications = await getNotifications();
  const tutors = await getTutors();
  return {
    props: {
      tutors: tutors.data,
      notifications: reduceNotifications(
        notifications.data.sort(
          // @ts-ignore
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      ),
    },
  };
};

export default NotificationsPage;
