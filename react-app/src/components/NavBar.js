import React from 'react';
import { useDispatch } from "react-redux";
import { setLandingPage } from '../store/actions/ui'
import LogoutButton from './LogoutButton';
import {
  Paper,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  makeStyles
} from '@material-ui/core';
import SignUpForm from './forms/SignUpForm'
import LoginForm from './forms/LoginForm'
import NavBarStyles from '../styles/NavBarStyles'
import { MyModal } from './Modal'


const NavBar = ({ setAuthenticated, authenticated }) => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const dispatch = useDispatch();
  const useStyles = NavBarStyles();
  const classes = useStyles();

  const iconClick = () => {
    dispatch(setLandingPage(true))
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  return (
    <div className={classes.root}  >
      <AppBar position="static" className={classes.navbar} >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
              <img
                className={classes.logo}
                onClick={()=> iconClick()}
                src="https://drama-deets.s3.amazonaws.com/DramaDeetsLogo.png"
                alt="Logo" />
          </Typography>
          {!authenticated ?
            <>
            <Button background="blue" color="secondary" className={classes.signup} onClick={handleOpen}>
                Sign Up
            </Button>
            </>
            : true}
            <MyModal
              open={open}
              handleOpen2={handleOpen2}
              setOpen={setOpen}
              onClose={handleClose}
              aria-labelledby="Sign up form modal"
              aria-describedby="Sign up form"
              setAuthenticated={setAuthenticated}
              authenticated={authenticated}
              Form={SignUpForm}
            />
          {authenticated ?
              <LogoutButton setAuthenticated={setAuthenticated} />
            :
            <>
              <Button className={classes.login} onClick={handleOpen2} >
                Login
              </Button>

              <MyModal
                open={open2}
                setOpen={setOpen2}
                onClose={handleClose2}
                handleOpen={handleOpen}
                setAuthenticated={setAuthenticated}
                authenticated={authenticated}
                className={classes.modal1}
                aria-labelledby="simple-modal-title2"
                aria-describedby="simple-modal-description2"
                Form={LoginForm}
              />
            </>
            }
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default NavBar;
