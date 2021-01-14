import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { login } from "../../services/auth";
import { fetchBusinesses, getBusiness, fetchTypes } from "../../services/businesses";
import { useDispatch } from 'react-redux';
import { setCurrentUser , setCurrentBusiness} from '../../store/actions/session'
import { getAllBusinesses, getAllTypes } from '../../store/actions/entities'
import { setLandingPage } from '../../store/actions/ui'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const LoginForm = ({ authenticated, setAuthenticated, setOpen2}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory()


  const useStyles = makeStyles((theme) => ({
    button: {
      background: "black",
      color: "white",
      marginTop: "1em",
      "&:hover": {
        backgroundColor: "#1b4332"
      },
    },
    demoButton: {
      background: "#52b788",
      color: "white",
      marginTop: "1em",
      "&:hover": {
        backgroundColor: "#1b4332"
      },
    },
    input: {
      borderRadius: "1em",
      backgroundColor: "white",
      marginTop: ".5em",
      marginBottom: ".5em"
    },
    loginForm: {
      marginTop: "2.5em",
      marginBottom: "1em"
    }
  }));
  const classes = useStyles();


  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      dispatch(setCurrentUser(user))
      const businesses = await fetchBusinesses()
      dispatch(getAllBusinesses(businesses))
      const business = await getBusiness(1)
      dispatch(setCurrentBusiness(business))
      dispatch(setLandingPage(true))
      const types = await fetchTypes()
      dispatch(getAllTypes(types))
      setOpen2(false)
      setAuthenticated(true)
      history.push("/")
    } else {
      setErrors(user.errors);
    }
    if (authenticated) {
      return <Redirect to="/" />;
    }

    if (!authenticated) {
    }
};

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  return (

    <form className={classes.loginForm} onSubmit={onLogin}>
      <div>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
        <TextField
          label="Email"
          variant="outlined"
          className={classes.input}
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        </div>
        <Button
          variant="contained"
          className={classes.button}
          type="submit">
        Login
        </Button>
      <br></br>
        <Button
          variant="contained"
          className={classes.demoButton}
          onClick={() => {
          setEmail("infoDramaDeets@gmail.com")
          setPassword("metoo6447!")
          }}
          type="submit">
        Admin Demo
        </Button>
      <br></br>
        <Button
          variant="contained"
          className={classes.demoButton}
          onClick={() => {
          setEmail("demo@aa.io")
          setPassword("password")
          }}
          type="submit">
          User Demo
        </Button>
    </form>
  );
};

export default LoginForm;
