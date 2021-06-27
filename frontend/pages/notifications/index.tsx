import { GetServerSideProps } from 'next';

import NotificationPage from '../../components/notification/page.notification';

import {
  getTutors,
  getNotifications,
} from '../../services/get.service';
import { reduceNotifications } from '../../utils/reducers';

const NotificationsPage = ({
  notifications,
}: {
  notifications: NotificationResponse[];
}) => <NotificationPage notifications={notifications} />;

export const getServerSideProps: GetServerSideProps = async () => {
  const notifications = await getNotifications();
  const tutors = await getTutors();
  return {
    props: {
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
