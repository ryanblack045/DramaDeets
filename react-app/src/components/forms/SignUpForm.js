import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../services/auth';
import { fetchBusinesses, getBusiness } from "../../services/businesses";
import { useDispatch } from 'react-redux';
import { setCurrentUser, setCurrentBusiness } from '../../store/actions/session'
import { getAllBusinesses } from '../../store/actions/entities'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { setLandingPage } from '../../store/actions/ui'
import NavBarStyles from '../../styles/NavBarStyles'


const SignUpForm = ({
  authenticated,
  setAuthenticated,
  setOpen,
  handleClose,
  handleOpen2 }) => {

  const [setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory()
  const useStyles = NavBarStyles()
  const classes = useStyles();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        dispatch(setCurrentUser(user))
        const businesses = await fetchBusinesses()
        dispatch(getAllBusinesses(businesses))
        const business = await getBusiness(1)
        dispatch(setCurrentBusiness(business))
        dispatch(setLandingPage(true))
        setOpen(false)
        setAuthenticated(true);
        history.push("/")
      } else {
        setErrors(user.errors);
      }
      if (authenticated) {
        return <Redirect to="/" />;
      }
      if (!authenticated) {

      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
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
      <form className={classes.signupForm} onSubmit={onSignUp}>
        <div>
          <TextField
            variant="outlined"
            label="User Name"
            className={classes.input}
            name="username"
            onChange={updateUsername}
            value={username}
          />
          <TextField
            variant="outlined"
            className={classes.input}
            label="Email"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          />
          <TextField
            variant="outlined"
            className={classes.input}
            label="Password"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          />
          <TextField
            variant="outlined"
            className={classes.input}
            label="Repeat Password"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          />
        </div>
      <Button className={classes.button} variant="contained" type="submit">Sign Up</Button>
      </form>
      <span>Already have an account?</span>
        <span className={classes.textButton}
          onClick={() => {
            handleClose()
            handleOpen2()
          }}> Login</span>
    </>
  );
};

export default SignUpForm;
