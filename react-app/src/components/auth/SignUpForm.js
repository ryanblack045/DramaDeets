import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import { fetchBusinesses } from "../../services/businesses";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/actions/session'
import { getAllBusinesses } from '../../store/actions/entities'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const SignUpForm = ({authenticated, setAuthenticated, open, setOpen}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    button: {
      background: "black",
      color: "white",
      marginTop: ".5em",
      marginBottom: ".5em",
      "&:hover": {
        backgroundColor: "#1b4332"
      },
    },
    input: {
      borderRadius: "1em",
      backgroundColor: "white",
      marginTop: ".5em",
      marginBottom: ".5em"
  }
  }));
  const classes = useStyles();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(setCurrentUser(user))
        const businesses = await fetchBusinesses()
        dispatch(getAllBusinesses(businesses))
        setOpen(false)
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
      <Button className={classes.button} variant="Contained" type="submit">Sign Up</Button>
    </form>
  );
};

export default SignUpForm;
