/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Alert, { AlertProps } from '@material-ui/core/Alert';
import { createStyles, makeStyles } from '@material-ui/styles';

import {
  XOctagon as Error,
  AlertTriangle as Warning,
  Check as Success,
  Info,
} from 'react-feather';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 600,
      '& > * + *': {
        marginTop: '24px',
      },
    },
  })
);

export default function Toast({
  warning,
  info,
  error,
  message,
  open,
  setOpen,
}: {
  success?: boolean;
  warning?: boolean;
  info?: boolean;
  error?: boolean;
  message?: string | any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const classes = useStyles();
  const handleClose = (reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} onClose={() => handleClose}>
        <SnackbarContent
          message={message}
          action={
            error ? (
              <Error />
            ) : warning ? (
              <Warning />
            ) : info ? (
              <Info />
            ) : (
              <Success />
            )
          }
        />
      </Snackbar>
    </>
  );
}
