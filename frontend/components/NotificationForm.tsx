import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { useNotification } from '../context/notification.context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    margin: {
      margin: theme.spacing(1),
    },
  })
);
// notification: string;
//   setNotification: React.Dispatch<React.SetStateAction<string>>;
//   submitting: boolean;
//   setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
//   handleSubmit: (
//     e: React.FormEvent<HTMLFormElement>
//   ) => Promise<void>;
//   handleCancel: () => void;

const NotificationForm = () => {
  const classes = useStyles();
  const {
    notification,
    setNotification,
    submitting,
    setSubmitting,

    handleCancel,
    handleSubmit,
  } = useNotification();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
            <FormControl fullWidth className={classes.margin}>
              <InputLabel htmlFor="standard-adornment-amount">
                Amount
              </InputLabel>
              <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={8}
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
                // value={values.amount}
                // onChange={handleChange('amount')}
                // startAdornment={
                //   <InputAdornment position="start">$</InputAdornment>
                // }
              />
            </FormControl>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default NotificationForm;
