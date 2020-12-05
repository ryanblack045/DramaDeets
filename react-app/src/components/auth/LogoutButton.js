import React from "react";
import { logout } from "../../services/auth";
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../store/actions/session'

const LogoutButton = ({ setAuthenticated }) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    dispatch(setCurrentUser(""))

  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
