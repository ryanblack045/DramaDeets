import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { newBusiness } from '../../services/businesses';
import { fetchBusinesses, getBusiness, addBusinessType } from "../../services/businesses";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setCurrentBusiness } from '../../store/actions/session'
import { getAllBusinesses } from '../../store/actions/entities'
import {businessTypes} from '../ListSideBar'
import {
  TextField,
  makeStyles,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Button,

} from '@material-ui/core';
import { setLandingPage } from '../../store/actions/ui'
import { ImageOutlined } from "@material-ui/icons";


const BusinessForm = ({ authenticated, setAuthenticated, setOpen5, open5 }) => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [website, setWebsite] = useState("");
  const [contact, setContact] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [typeId, setTypeId] = useState("");
  const dispatch = useDispatch();
  const history = useHistory()
  const userId = 1

  const businessTypes = useSelector((state) => (state.entities.businessTypes.byId))
  const useStyles = makeStyles((theme) => ({
    businessFormHolder: {
      overflow: "scroll",
      height: "35em"
    },
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
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "15em",
    },
  }));
  const classes = useStyles();

  // const addTypeToBusiness = async (e) => {
  //   const typeAdded = await addBusinessType(newBusinessId, typeId);
  //   if (!typeAdded.errors) {
  //     const businesses = await fetchBusinesses()
  //     dispatch(getAllBusinesses(businesses))
  //   } else {
  //     setErrors(typeAdded.errors)
  //   }
  // }

  const createBusiness = async (e) => {
    e.preventDefault();
    const createdBusiness = await newBusiness(userId, name, description,
      lat, lng, address, city, state, zipcode, website, contact, imgURL);
    if (!createdBusiness.errors) {
      const businesses = await fetchBusinesses()
      dispatch(getAllBusinesses(businesses))
      if (businesses) {
        await addBusinessType(createdBusiness.id, typeId)
        const businesses = await fetchBusinesses()
        dispatch(getAllBusinesses(businesses))
        setOpen5(!open5)
      } else {
        return
      }
    } else {
      setErrors(createdBusiness.errors);
    }
  };


  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateLat = (e) => {
    setLat(e.target.value);
  };

  const updateLng = (e) => {
    setLng(e.target.value);
  };

  const updateAddress = (e) => {
    setAddress(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const updateState = (e) => {
    setState(e.target.value);
  };

  const updateZipcode = (e) => {
    setZipcode(e.target.value);
  };

  const updateWebsite = (e) => {
    setWebsite(e.target.value);
  };

  const updateContact = (e) => {
    setContact(e.target.value);
  };

  const updateImgURL = (e) => {
    setImgURL(e.target.value);
  };

  const updateTypeId = (e) => {
    setTypeId(e.target.value);
  };

  return (
    <form className={classes.signupForm} onSubmit={createBusiness} >
      <div className={classes.businessFormHolder}>
        <TextField
          variant="outlined"
          label="Name of business"
          className={classes.input}
          name="name"
          onChange={updateName}
          value={name}
          required={true}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Description of business"
          type="text"
          name="description"
          onChange={updateDescription}
          value={description}
          required={true}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Lat coordinate"
          type="test"
          name="lat"
          onChange={updateLat}
          value={lat}
          required={true}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Long coordinate"
          type="text"
          name="lng"
          onChange={updateLng}
          value={lng}
          required={true}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Address"
          type="text"
          name="address"
          onChange={updateAddress}
          value={address}
          required={true}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="City"
          type="text"
          name="city"
          onChange={updateCity}
          value={city}
          required={true}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="State"
          type="text"
          name="state"
          onChange={updateState}
          value={state}
          required={true}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Zipcode"
          type="text"
          name="zipcode"
          onChange={updateZipcode}
          value={zipcode}
          required={true}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Website Address"
          type="text"
          name="website"
          onChange={updateWebsite}
          value={website}
          required={true}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Email or phone number"
          type="text"
          name="contact"
          onChange={updateContact}
          value={contact}
          required={true}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Image Url"
          type="text"
          name="imgURL"
          onChange={updateImgURL}
          value={imgURL}
        />
        <FormControl
          className={classes.formControl}
          variant="outlined"
        >
        <InputLabel id="demo-simple-select-outlined-label">Type of Business</InputLabel>
        <Select
          labelId="type"
          id="type-selector"
          value={typeId}
          onChange={updateTypeId}
          label="Type"
          required={true}
          >
            {businessTypes.map((type) => {
              return <MenuItem value={type.id}>{type.title}</MenuItem>
          })}
        </Select>
      </FormControl>
      <Button className={classes.button} variant="contained" type="submit ">Create Business</Button>
      </div>
    </form>
  );
};

export default BusinessForm;
