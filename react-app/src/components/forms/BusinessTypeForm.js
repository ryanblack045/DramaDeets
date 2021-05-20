import React, { useState } from "react";
import { fetchBusinesses, newBusinessType } from "../../services/businesses";
import { useDispatch, useSelector } from 'react-redux';
import { addType } from '../../store/actions/entities'
import BusinessStyles from '../../styles/BusinessStyles'
import {
  TextField,
  makeStyles,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Button,
} from '@material-ui/core';


const BusinessTypeForm = ({ setOpen, open }) => {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState("")
  const dispatch = useDispatch();
  const userId = 1

  const businessTypes = useSelector((state) => (state.entities.businessTypes.byId))
  const useStyles = BusinessStyles();
  const classes = useStyles();

  const createBusinessType = async (e) => {
    e.preventDefault();
    const createdBusinessType = await newBusinessType(title);
    if (!createdBusinessType.errors) {
      dispatch(addType(createdBusinessType))
      setOpen(!open)
    } else {
      setErrors(createdBusinessType.errors);
    }
  };


  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <form className={classes.signupForm} onSubmit={createBusinessType} >
      <div className={classes.businessFormHolder}>
        <TextField
          variant="outlined"
          label="Business Type"
          className={classes.input}
          name="title"
          onChange={updateTitle}
          value={title}
          required={true}
        />
      <Button className={classes.button} variant="contained" type="submit ">Create Business Type</Button>
      </div>
    </form>
  );
};

export default BusinessTypeForm;
