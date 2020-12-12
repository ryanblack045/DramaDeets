import React from 'react';
import { NavLink } from 'react-router-dom';
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
import SignUpForm from './auth/SignUpForm'
import LoginForm from './auth/LoginForm'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
  background: "transparent"
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  title: {
    flexGrow: 1,
  },
  login: {
    background: "white",
    color: "blue"
  },
  signup: {
    background: "white",
    color: "blue"
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
  logo: {
    height: "4em",
    width: "4em",
    marginTop: ".5em"
  }
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
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false)

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
        setOpen={setOpen}/>
        </Paper>
    </div>
  );

  const loginModal = (
    <div style={modalStyle} border="none" className={classes.paper}>
      <LoginForm setAuthenticated={setAuthenticated}
        authenticated={authenticated}
        open2={open2}
        setOpen2={setOpen2}
        />
    </div>
  );

  return (
    <div className={classes.root}  >
      <AppBar position="static" className={classes.navbar} >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {authenticated ?
              <img className={classes.logo} src="/DramaDeetsLogo.png" alt="Logo" />
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
            <LogoutButton setAuthenticated={setAuthenticated}/>
            :
             <Button className={classes.login} onClick={handleOpen2} >
                Login
              </Button>
          }

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




        </Toolbar>
      </AppBar>
    </div>
  );
}


//   return (
//     <nav>
//       <ul>
//         <li>
//           <NavLink to="/" exact={true} activeClassName="active">
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/login" exact={true} activeClassName="active">
//             Login
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/sign-up" exact={true} activeClassName="active">
//             Sign Up
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/users" exact={true} activeClassName="active">
//             Users
//           </NavLink>
//         </li>
//         {authenticated ?
//             <LogoutButton authenticated={authenticated} setAuthenticated={setAuthenticated} />
//           : null}
//       </ul>
//     </nav>
//   );
// }

export default NavBar;
