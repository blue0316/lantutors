import { GetServerSideProps } from 'next';

import NotificationPage from '../../components/notification/page.notification';

import { getNotificationsByTutor } from '../../services/get.service';
import { reduceNotifications } from '../../utils/reducers';

const NotificationsTutorPage = ({
  notifications,
}: {
  notifications: NotificationResponse[];
}) => <NotificationPage notifications={notifications} />;

export const getServerSideProps: GetServerSideProps = async ({
  params,
}) => {
  const notifications = await getNotificationsByTutor(
    params && params.tutor
  );
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

export default NotificationsTutorPage;
