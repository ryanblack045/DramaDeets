import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Paper } from '@material-ui/core';
import ReviewForm from './auth/ReviewForm'

const useStyles = makeStyles((theme) => ({
  reviewModal: {
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
  reviewModalHeader: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
  },
  reviewSubheader: {
    fontSize: "1.3em"
   },
  reviewSubheaderBold: {
    fontSize: "1.3em",
    fontWeight: "bold",
    textDecoration: "underline"
  },
  reviewTitle: {
    fontSize: "3em",
    lineHeight: ".75em",
    fontFamily: "brandon-grotesque, sans-serif",
    marginBottom: ".5em",
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

export function ReviewModal({open, setOpen}) {
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
    <div style={modalStyle} border="none" className={classes.reviewModal}>
      <Paper className={classes.reviewModalHeader}>
        <div>
          <div className={classes.reviewTitle}>
            <br></br>
            Review form.
          </div>
          <span className={classes.reviewSubheader}>Be </span>
          <span className={classes.reviewSubheaderBold}>fair</span>
          <span className={classes.reviewSubheader}>, be </span>
          <span className={classes.reviewSubheaderBold}>respectful.<br></br></span>
          <span className={classes.reviewSubheader}> Toxic posts will be </span>
          <span className={classes.reviewSubheaderBold}>deleted</span>
        </div>
        <ReviewForm className={classes.reviewForm}
          open={open}
          setOpen={setOpen}
        />
      </Paper>
      </div>
    </Modal>
  </>
  );
}
