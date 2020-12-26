import React from 'react';
import {
  makeStyles,
  Drawer
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  drawer: {

  },
  drawerButton: {
    marginLeft: "1.5em",
    color: "white",
    cursor: "pointer",
    fontSize: "1.5em",
    height: "auto",
    width: "fit-content",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
     color: "#74c69d"
    },
  },
  email: {
    marginRight: "1.5em",
    textAlign: "center",
    color: "white",
    fontSize: "1.5em"
  },
  emailLink: {
    color: "white",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
     color: "#74c69d"
    },
  },
  footer: {
    width: "100vw",
    height: "12vh",
    background: "black",
    marginTop: "4vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  myInfo: {
    height: "40vh"
  }
}))

export default function Footer() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const classes = useStyles();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }


  return (
    <>
      <div className={classes.footer}>
          <div
            onClick={() => setDrawerOpen(true)}
            className={classes.drawerButton}>
          About the creator
          </div>
          <div className={classes.email}>
            Contact: <a className={classes.emailLink} href="mailto:infoDramaDeets@gmail.com">infoDramaDeets@gmail.com</a>
          </div>
          <Drawer
          anchor="bottom"
          className={classes.drawer}
          open={drawerOpen}
          onClose={toggleDrawer}>
          <div>
            <div className={classes.myInfo}>Hello World</div>
          </div>
          </Drawer>
      </div>
    </>
  )
}
