/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import * as React from 'react';
import { useRouter } from 'next/router';

import Toast from '../components/toast';
import { storage } from '../utils/storage';
import { signInRequest } from '../services/auth.service';

/**
 * Top-most Context provider for all user authentication: form values, auth errors etc.
 *
 */

export type TutorContent = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  heading: string;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
  alert: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  handleSignIn: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
};

export const TutorContext = React.createContext<TutorContent>(
  undefined!
);

export function TutorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [email, setEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [heading, setHeading] = React.useState('');
  const [alert, setAlert] = React.useState(false);

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
    }, 1750);
  };
  const onWarning = (text: string | any) => {
    setMessage(text);
    setOpenWarning(true);
    setTimeout(() => {
      setOpenWarning(false);
      setMessage('');
    }, 1750);
  };
  const onError = (text: string | any) => {
    setMessage(text);
    setOpenError(true);
    setTimeout(() => {
      setOpenError(false);
      setMessage('');
    }, 1750);
  };

  const router = useRouter();

  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInRequest({
        body: {
          email,
          password,
        },
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (data.message) {
              setPassword('');
              setEmail(email);
              setLoggedIn(true);
              storage.setUserLocal(email);

              setTimeout(() => {
                onSuccess(data.message);
              }, 750);
              setTimeout(() => {
                setLoading(false);
                router.push(`/home`);
              }, 1500);
            } else {
              setLoading(false);
              onError(`Access Failed: ${data?.message}`);
            }
          });
        } else {
          response.json().then((data) => {
            if (data.message) {
              setLoading(false);
              onWarning(data.message);
            }
          });
        }
      });
    } catch (err: any) {
      setLoading(false);
      onError(err.message);
    }
  };

  React.useEffect(() => {
    function checkUserData(e: StorageEvent) {
      if (e.key === 'app_logout') {
        setEmail('');
        setLoggedIn(false);
        onError("Oops. It seems you've been logged out.");
      }
    }
    window.addEventListener('storage', (e) => checkUserData(e));
    return () => {
      window.removeEventListener('storage', (e) => checkUserData(e));
    };
  }, []);

  React.useEffect(() => {
    if (!(email || loggedIn)) {
      storage.clearUserLocal();
      storage.setLogoutEvent();
      router.push('/');
    }
  }, [email, loggedIn]);

  return (
    <TutorContext.Provider
      value={{
        email,
        setEmail,
        loggedIn,
        setLoggedIn,
        loading,
        setLoading,
        handleSignIn,
        password,
        setPassword,
        heading,
        setHeading,
        alert,
        setAlert,
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
    </TutorContext.Provider>
  );
}

export const useTutor = () => React.useContext(TutorContext);
