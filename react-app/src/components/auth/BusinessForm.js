import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { newBusiness } from '../../services/businesses';
import { fetchBusinesses, getBusiness, addBusinessType } from "../../services/businesses";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setCurrentBusiness } from '../../store/actions/session'
import { getAllBusinesses } from '../../store/actions/entities'
import {businessTypes} from '../ListSideBar'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { setLandingPage } from '../../store/actions/ui'
import { ImageOutlined } from "@material-ui/icons";


const BusinessForm = ({ authenticated, setAuthenticated, setOpen3 }) => {
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
  const [businessId, setBusinessId] = useState("")
  const dispatch = useDispatch();
  const history = useHistory()
  const userId = 1
  const allBusinessesArrayLength = useSelector((state) => (state.entities.businesses.allId).length)
  const newBusinessId = useSelector((state) => (state.entities.businesses.allId[allBusinessesArrayLength -1]));
  console.log(newBusinessId)

  const useStyles = makeStyles((theme) => ({
    businessFormHolder: {
      overflow: "scroll",
      height: "30em"
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
  }
  }));
  const classes = useStyles();

  const createBusiness = async (e) => {
    e.preventDefault();
    const createdBusiness = await newBusiness(userId, name, description,
      lat, lng, address, city, state, zipcode, website, contact, imgURL, typeId);
    if (!createdBusiness.errors) {
      const businesses = await fetchBusinesses()
      dispatch(getAllBusinesses(businesses))
    } else {
      setErrors(createdBusiness.errors);
    }
  };

  const addTypeToBusiness = async (e) => {
    console.log("adding type")
    console.log(typeId)
    const typeAdded = await addBusinessType(newBusinessId, typeId);
    if (!typeAdded.errors) {
      const businesses = await fetchBusinesses()
      dispatch(getAllBusinesses(businesses))
    } else {
      setErrors(typeAdded.errors)
    }
  }

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

  const updateBusinessId = (e) => {
    setBusinessId(e.targe.value);
  }

  return (
    <form className={classes.signupForm} onSubmit={createBusiness} >
      <div className={classes.businessFormHolder}>
        <TextField
          variant="outlined"
          label="Name of business"
          className={classes.input}
          name="username"
          onChange={updateName}
          value={name}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Description of business"
          type="text"
          name="description"
          onChange={updateDescription}
          value={description}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Lat coordinate"
          type="test"
          name="lat"
          onChange={updateLat}
          value={lat}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Long coordinate"
          type="text"
          name="lng"
          onChange={updateLng}
          value={lng}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Address"
          type="text"
          name="address"
          onChange={updateAddress}
          value={address}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="City"
          type="text"
          name="city"
          onChange={updateCity}
          value={city}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="State"
          type="text"
          name="state"
          onChange={updateState}
          value={state}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Zipcode"
          type="text"
          name="zipcode"
          onChange={updateZipcode}
          value={zipcode}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Website Address"
          type="text"
          name="website"
          onChange={updateWebsite}
          value={website}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Email or phone number"
          type="text"
          name="contact"
          onChange={updateContact}
          value={contact}
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
        <TextField
          variant="outlined"
          className={classes.input}
          label="Business Type Id"
          type="text"
          name="typeId"
          onChange={updateTypeId}
          value={typeId}
        />
        <TextField
          variant="outlined"
          className={classes.input}
          label="Business Id"
          type="text"
          name="businessId"
          onChange={updateBusinessId}
          value={businessId}
        />
      </div>
      <Button className={classes.button} variant="contained" type="submit ">Create Business</Button>
      <Button className={classes.button} variant="contained" onClick={()=> addTypeToBusiness()} >Set Type</Button>
    </form>
  );
};

export default BusinessForm;
