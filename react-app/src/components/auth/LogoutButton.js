import React from "react";
import { logout } from "../../services/auth";
import { useDispatch } from 'react-redux'
import { setCurrentUser, setCurrentBusiness } from '../../store/actions/session'
import { setLandingPage} from '../../store/actions/ui'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const LogoutButton = ({ setAuthenticated }) => {
  const useStyles = makeStyles((theme) => ({
    button: {
      background: "black",
      color: "white",
      marginRight: "1em",
      "&:hover": {
        backgroundColor: "#1b4332"
      },
    }
  }));

  const classes = useStyles();
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    dispatch(setCurrentUser(""))
    dispatch(setCurrentBusiness(""))
    dispatch(setLandingPage(""))
  };

  return <Button className={classes.button} onClick={onLogout}>Logout</Button>;
};

export default LogoutButton;
