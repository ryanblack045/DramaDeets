import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    width: "100vw",
    height: "12vh",
    background: "black",
    marginTop: "4vh"
}
}))

export default function Footer() {

  const classes = useStyles();


  return (
    <>
      <div className={classes.footer}></div>
    </>
  )
}
