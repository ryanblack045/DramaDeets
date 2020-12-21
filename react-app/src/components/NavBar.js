import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setLandingPage } from '../store/actions/ui'
import LogoutButton from './auth/LogoutButton';
// import { theme } from '../styles/Theme';
import {
  Paper,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  makeStyles
} from '@material-ui/core';
import BusinessForm from './auth/BusinessForm'
import SignUpForm from './auth/SignUpForm'
import LoginForm from './auth/LoginForm'
import Background from '../assets/DramaDeetsLogo.png'

// const Background = "../assets/DramaDeetsLogo.png"
const useStyles = makeStyles((theme) => ({
  businessFormHolder: {
    maxHeight: "5em",
    overflow: "scroll"
  },
  headerBody: {
    marginTop: "2em",
  },
  login: {
    background: "white",
    color: "blue",
    marginRight: "2em",
    "&:hover": {
      backgroundColor: "black",
      color: "white"
    },
  },
  logo: {
    textAlign:"center",
    cursor: "pointer",
    marginTop: "-3.25em",
    marginBottom: "-3.5em",
    marginLeft:"1em"
  },
  loginTitle: {
    fontSize: "3em",
    lineHeight: "1.25em",
    fontFamily: "brandon-grotesque, sans-serif",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navbar: {
    background: "transparent"
  },
  newLogo: {
    background:"blue",
    backgroundImage: `url(${Background})`,
    height: "10em",
    width: "10em",
    cursor:"pointer"
  },
  paper: {
    position: 'absolute',
    width: 400,
    height: 600,
    backgroundColor: "#1b4332",
    outline: "none",
    borderRadius: 16,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center"
  },
  root: {
    flexGrow: 1,
  },
  signup: {
    background: "white",
    marginRight: "2em",
    color: "blue",
    "&:hover": {
      backgroundColor: "black",
      color: "white"
    },
  },
  signupHeader: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
  },
  signupSubheader: {
    fontSize: "1.1em"
  },
  signupSubheaderBold: {
    fontSize: "1.1em",
    fontWeight: "bold",
    textDecoration: "underline"
  },
  signupTitle: {
    fontSize: "3em",
    lineHeight: ".75em",
    fontFamily: "brandon-grotesque, sans-serif",
    marginBottom: ".25em",
  },
  textButton: {
    textDecoration: "underline",
    fontWeight: "bold",
    cursor:"pointer",
  },
  title: {
    flexGrow: 1,
  },
}));




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

const NavBar = ({ setAuthenticated, authenticated }) => {
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false)
  const dispatch = useDispatch()
  const classes = useStyles();
  // const currentUserId = useSelector((state) => (state.session.currentUser.id));

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

  const signupModal = (
    <div style={modalStyle} border="none" className={classes.paper}>
      <Paper className={classes.signupHeader}>
        <div>
          <div className={classes.signupTitle}>
            <br></br>
            Join our community.
          </div>
          <span className={classes.signupSubheader}>We believe through unfiltered reviews that we can all work together
          to provide a </span>
          <span className={classes.signupSubheaderBold}>safer</span>
          <span className={classes.signupSubheader}>, more </span>
          <span className={classes.signupSubheaderBold}>inclusive</span>
          <span className={classes.signupSubheader}> and </span>
          <span className={classes.signupSubheaderBold}>reliable</span>
          <span className={classes.signupSubheader}> experience for </span>
          <span className={classes.signupSubheaderBold}>everyone.</span>
        </div>
      <SignUpForm className={classes.signUp} setAuthenticated={setAuthenticated}
        authenticated={authenticated}
        open={open}
          setOpen={setOpen} />
        <span>Already have an account?</span>
        <span className={classes.textButton}
          onClick={() => {
            handleClose()
            handleOpen2()
          }}> Login</span>
        </Paper>
    </div>
  );

  const loginModal = (
    <div style={modalStyle} border="none" className={classes.paper}>
       <Paper className={classes.signupHeader}>
        <div>
          <div className={classes.loginTitle}>
            <br></br>
            Welcome back.
          </div>
        <div className={classes.headerBody}>
          <span className={classes.signupSubheader}>This is not a hate forum, please be </span>
          <span className={classes.signupSubheaderBold}>respectful</span>
          <span className={classes.signupSubheader}> with all reviews. This was built to </span>
          <span className={classes.signupSubheaderBold}>empower</span>
          <span className={classes.signupSubheader}> our community, please don't use it to tear it down. </span>
        </div>
      </div>
        <LoginForm setAuthenticated={setAuthenticated}
          authenticated={authenticated}
          open2={open2}
          setOpen2={setOpen2}
          />
        <span>Don't have an account?</span>
        <span className={classes.textButton}
          onClick={() => {
            handleClose2()
            handleOpen()
          }}> Signup</span>
        </Paper>
    </div>
  );

  return (
    <div className={classes.root}  >
      <AppBar position="static" className={classes.navbar} >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {authenticated ?
              <img
                className={classes.logo}
                onClick={()=> iconClick()}
                src="https://drama-deets.s3.amazonaws.com/DramaDeetsLogo.png"
                alt="Logo" />
              // <div
              //   className={classes.newLogo}
              //   style={{   backgroundImage: `url(${Background})`, minHeight:"3em", minWidth:"3em", cursor:"pointer"}}
              // >
              // </div>
              : false}
          </Typography>
          {!authenticated ?
            <Button background="blue" color="secondary" className={classes.signup} onClick={handleOpen}>
              Sign Up
            </Button>
            : true}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="Sign up form modal"
              aria-describedby="Sign up form"
              setAuthenticated={setAuthenticated}
              authenticated={authenticated}
            >
              {signupModal}
            </Modal>

          {authenticated ?
              <LogoutButton setAuthenticated={setAuthenticated} />
            :
            <>
              <Button className={classes.login} onClick={handleOpen2} >
                Login
              </Button>

              <Modal
                open={open2}
                onClose={handleClose2}
                setAuthenticated={setAuthenticated}
                authenticated={authenticated}
                className={classes.modal1}
                aria-labelledby="simple-modal-title2"
                aria-describedby="simple-modal-description2"
              >
                {loginModal}
              </Modal>
            </>
            }
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default NavBar;
