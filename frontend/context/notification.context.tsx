import React from 'react';
import { useRouter } from 'next/router';

import Toast from '../components/Toast';
import { useTutor } from './tutor.context';

import { postRequest } from '../services/post.service';

import {
  getRawCommonStudents,
  getStudent,
  getStudents,
} from '../services/get.service';

/**
 * Fourth-level Context provider for all CRUD operations.
 * Creating, Editing, Deleting user's own collections and snippets.
 *
 * @since 2021-04-08
 */

type NotificationType = {
  notification: string;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
  submitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  handleCancel: () => void;
};

const NotificationContext = React.createContext<NotificationType>(
  undefined!
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { email } = useTutor();
  const router = useRouter();
  const [notification, setNotification] = React.useState<string>('');

  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openWarning, setOpenWarning] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const [message, setMessage] = React.useState<string | any>('');

  const onSuccess = (text: string | any) => {
    setMessage(text);
    setOpenSuccess(true);
    setTimeout(() => {
      setOpenSuccess(false);
      setMessage('');
    }, 8000);
  };
  const onWarning = (text: string | any) => {
    setMessage(text);
    setOpenWarning(true);
    setTimeout(() => {
      setOpenWarning(false);
      setMessage('');
    }, 1250);
  };
  const onError = (text: string | any) => {
    setMessage(text);
    setOpenError(true);
    setTimeout(() => {
      setOpenError(false);
      setMessage('');
    }, 1250);
  };

  const handleCancel = () => {
    router.back();
    setNotification('');
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await postRequest({
        url: `api/retrievenotifications`,

        body: {
          tutor: email,
          notification,
        },
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (data.message) {
              setTimeout(() => {
                onSuccess(
                  `Notification sent. Recipients: ${data.recipients}`
                );
              }, 750);
              setTimeout(() => {
                setSubmitting(false);
                setNotification('');
                router.push({ pathname: `/notifications` });
              }, 900);
            } else {
              setSubmitting(false);
              onError(`Notification post failed: ${data?.message}`);
            }
          });
        } else {
          response.json().then((data) => {
            if (data.message) {
              setSubmitting(false);
              onWarning(data.message);
            } else {
              setSubmitting(false);
              onWarning('Something went wrong');
            }
          });
        }
      });
    } catch (err: any) {
      setSubmitting(false);
      onError(err.message);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
        submitting,
        setSubmitting,
        handleCancel,
        handleSubmit,
      }}
    >
      {children}
      <Toast
        open={openSuccess}
        setOpen={setOpenSuccess}
        success
        message={message}
      />
      <Toast
        open={openWarning}
        setOpen={setOpenWarning}
        warning
        message={message}
      />
      <Toast
        open={openError}
        setOpen={setOpenError}
        error
        message={message}
      />
    </NotificationContext.Provider>
  );
}

export const useNotification = () =>
  React.useContext(NotificationContext);
