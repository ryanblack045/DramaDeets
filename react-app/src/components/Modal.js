import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Paper } from '@material-ui/core';
import ReviewForm from './forms/ReviewForm'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    height: 600,
    backgroundColor: "#1b4332",
    outline: "none",
    borderRadius: 16,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
  modalHeader: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
  },
}))


function getModalStyle() {
  const top =  50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    border: "none",
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export function MyModal({open, setOpen, currentBusinessId, currentUserId, Form}) {
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="Review form modal"
    aria-describedby="Review form"
    >
    <div style={modalStyle} border="none" className={classes.modal}>
      <Paper className={classes.modalHeader}>
            <Form
              open={open}
              setOpen={setOpen}
              currentBusinessId={currentBusinessId}
              currentUserId={currentUserId}
            />
      </Paper>
      </div>
    </Modal>
  </>
  );
}
