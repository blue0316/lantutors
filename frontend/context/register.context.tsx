/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useRouter } from 'next/router';

import Toast from '../components/toast';
import { useTutor } from './tutor.context';

import { postRequest } from '../services/post.service';

/**
 * Provider for registering students
 *
 */

const getEmailsFromMessage = (message: string) => {
  const result = [];
  const emailArray = message.match(
    /@([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
  );
  if (emailArray) {
    result.push(...emailArray.map((email) => email.substr(1)));
  }
  return result;
};

type RegisterType = {
  students: string;
  setStudents: React.Dispatch<React.SetStateAction<string>>;
  submitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  handleCancel: () => void;
};

const RegisterContext = React.createContext<RegisterType>(undefined!);

export function RegisterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { email } = useTutor();
  const router = useRouter();
  const [students, setStudents] = React.useState<string>('');

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
    setStudents('');
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await postRequest({
        url: `api/register`,

        body: {
          tutor: email,
          students: students.split(', '),
        },
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (data.message) {
              setTimeout(() => {
                onSuccess(
                  `${data.message}. Registered ${data.students} to ${data.tutor}`
                );
              }, 750);
              setTimeout(() => {
                setSubmitting(false);
                setStudents('');
                router.push({ pathname: `/home` });
              }, 900);
            } else {
              setSubmitting(false);
              onError(`${data?.message}`);
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
    <RegisterContext.Provider
      value={{
        students,
        setStudents,
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
    </RegisterContext.Provider>
  );
}

export const useRegister = () => React.useContext(RegisterContext);
