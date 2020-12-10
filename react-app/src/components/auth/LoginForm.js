import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { login } from "../../services/auth";
import { fetchBusinesses, getBusiness } from "../../services/businesses";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser , setCurrentBusiness} from '../../store/actions/session'
import { getAllBusinesses } from '../../store/actions/entities'

const LoginForm = ({ authenticated, setAuthenticated, setOpen2}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('demo@aa.io');
  const [password, setPassword] = useState('password');
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(setCurrentUser(user))
      const businesses = await fetchBusinesses()
      dispatch(getAllBusinesses(businesses))
      const business = await getBusiness(1)
      dispatch(setCurrentBusiness(business))
      setOpen2(false)
      history.push("/")
    } else {
      setErrors(user.errors);
    }
    if (authenticated) {
      console.log("inhere")
      return <Redirect to="/" />;
    }

    if (!authenticated) {
      console.log("nope")
    }
};

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  return (

    <form onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
