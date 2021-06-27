/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React from 'react';
import { useRouter } from 'next/router';

import Toast from '../components/toast';

import { postRequest } from '../services/post.service';

import {
  getRawCommonStudents,
  getStudent,
  getStudents,
  getRawStudents,
} from '../services/get.service';

/**
 * Fourth-level Context provider for all CRUD operations.
 * Creating, Editing, Deleting user's own collections and snippets.
 *
 * @since 2021-04-08
 */

type StudentsDataType = {
  suspendedStudent: string;
  setSuspendedStudent: React.Dispatch<React.SetStateAction<string>>;
  suspending: boolean;
  setSuspending: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  studentsData: Student[] | undefined;
  setStudentsData: React.Dispatch<
    React.SetStateAction<Student[] | undefined>
  >;
  suspendedStudentData: Student | undefined;
  setSuspendedStudentData: React.Dispatch<
    React.SetStateAction<Student | undefined>
  >;
  handleSuspend: () => Promise<void>;
  loadStudents: () => Promise<void>;
};

const StudentsContext = React.createContext<StudentsDataType>(
  undefined!
);

export function StudentsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [studentsData, setStudentsData] = React.useState<
    Student[] | undefined
  >(undefined!);

  const [suspendedStudent, setSuspendedStudent] = React.useState('');

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openWarning, setOpenWarning] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const [suspending, setSuspending] = React.useState(false);

  const [message, setMessage] = React.useState<string | any>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const [suspendedStudentData, setSuspendedStudentData] =
    React.useState<Student | undefined>(undefined!);

  const loadStudents = async () => {
    setLoading(true);
    const response = await getRawStudents();
    if (response && response.data) {
      setLoading(false);
      setStudentsData(response.data);
    }
  };

  const loadStudent = async (email: string) => {
    setLoading(true);
    const response = await getStudent(email);
    if (response && response.data) {
      setSuspendedStudentData(response.data);
    }
  };

  const onSuccess = (text: string | any) => {
    setMessage(text);
    setOpenSuccess(true);
    setTimeout(() => {
      setOpenSuccess(false);
      setMessage('');
    }, 1250);
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

  const handleSuspend = async () => {
    setSuspending(true);
    try {
      await postRequest({
        url: `api/suspend`,
        body: {
          student: suspendedStudent,
        },
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data.messsage) {
              setTimeout(() => {
                onSuccess(` ${data.messsage}`);
              }, 750);
              setTimeout(() => {
                setSuspending(false);

                setTimeout(() => {
                  loadStudents();
                  loadStudent(suspendedStudent);
                  setSuspendedStudent('');
                  // setTimeout(() => {
                  //   router.reload();
                  // }, 400);
                }, 400);
              }, 900);
            } else {
              setSuspending(false);
              setSuspendedStudent('');
              onError(` ${data?.message}`);
            }
          });
        } else {
          setSuspending(false);
          setSuspendedStudent('');
          onWarning('Request failed');
        }
      });
    } catch (err: any) {
      setSuspending(false);
      setSuspendedStudent('');
      onError(err.message);
    }
  };

  React.useEffect(() => {
    if (suspendedStudent !== '') {
      console.log(suspendedStudent);
      handleSuspend();
    }
  }, [suspendedStudent]);

  React.useEffect(() => {
    loadStudents();
  }, []);

  return (
    <StudentsContext.Provider
      value={{
        suspending,
        setSuspending,
        suspendedStudent,
        setSuspendedStudent,
        handleSuspend,
        loadStudents,
        studentsData,
        setStudentsData,
        loading,
        setLoading,
        suspendedStudentData,
        setSuspendedStudentData,
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
    </StudentsContext.Provider>
  );
}

export const useStudents = () => React.useContext(StudentsContext);
