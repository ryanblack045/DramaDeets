import React from 'react'
import { CurrentBusinessDisplay } from './CurrentBusinessDisplay'
import { getBusiness, sendUpdatedBusiness, deleteBusiness, fetchBusinesses} from "../services/businesses";
import { useDispatch } from "react-redux";
import { setCurrentBusiness } from '../store/actions/session'
import { getAllBusinesses } from '../store/actions/entities'
import { setLandingPage } from '../store/actions/ui'
import {
  TextField,
  Button,
  Snackbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bigSaveButton: {
    display: "block",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    background: "black",
    "&:hover": {
      backgroundColor: "#890909"
    },
  },
  businessInfo: {
    width: "30em",
    margin: ".5em"
  },
  businessInfoHolder: {
    flexDirection: "column",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  deleteReviewButton: {
    color: "white",
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "#780202"
    },
  },
  reviewButton: {
    display: "block",
    width: "50%",
    marginTop: ".5em",
    marginBottom: ".5em",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    background: "#74c69d",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "#2d6a4f"
    },
  },
  saveButton: {
    background: "red",
    height: "1.5em",
    color: "white",
    "&:hover": {
      backgroundColor: "#890909"
    },
  }
}));

export function EditBusinessForm({currentBusiness, currentUserId}) {
  const [editBusiness, setEditBusiness] = React.useState(false)
  const [name, setName] = React.useState("")
  const [lat, setLat] = React.useState("")
  const [lng, setLng] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [city, setCity] = React.useState("")
  const [stateLocation, setStateLocation] = React.useState("")
  const [zipcode, setZipcode] = React.useState("")
  const [website, setWebsite] = React.useState("")
  const [contact, setContact] = React.useState("")
  const [open3, setOpen3] = React.useState(false);
  const dispatch = useDispatch()
  const classes = useStyles()


  const handleOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const updateName = e => {
    setName(e.target.value)
  }

  const updateAddress = e => {
    setAddress(e.target.value)
  }

  const updateCity = e => {
    setCity(e.target.value)
  }

  const updateStateLocation = e => {
    setStateLocation(e.target.value)
  }

  const updateZipcode = e => {
    setZipcode(e.target.value)
  }

  const updateWebsite = e => {
    setWebsite(e.target.value)
  }

  const updateContact = e => {
    setContact(e.target.value)
  }

  const updateLat = e => {
    setLat(e.target.value)
  }

  const updateLng = e => {
    setLng(e.target.value)
  }

  const updateBusiness = async (currentBusinessId) => {
    await sendUpdatedBusiness(currentBusinessId, name, lat, lng, address, city, stateLocation, zipcode, website, contact)
    const business = await getBusiness(currentBusinessId);
    setEditBusiness(!editBusiness)
    dispatch(setCurrentBusiness(business))
  }


//deletes business
const sendDeleteBusiness = async (businessId) =>{
  await deleteBusiness(businessId)
  const businesses = await fetchBusinesses()
  dispatch(getAllBusinesses(businesses))
  dispatch(setLandingPage(true))
 return
}

  return (
  <>
    {editBusiness && currentUserId === 1 ?
      <>
        <div className={classes.businessInfoHolder}>
          <TextField
            className={classes.businessInfo}
            value={name}
            onChange={updateName}
            label="Name"
            placeholder={name}
            variant="outlined">
            {currentBusiness.name}
          </TextField>
          <TextField
            className={classes.businessInfo}
            value={lat}
            onChange={updateLat}
            label="Lat"
            placeholder={lat}
            variant="outlined">
            {currentBusiness.lat}
          </TextField>
          <TextField
            className={classes.businessInfo}
            value={lng}
            onChange={updateLng}
            label="Lng"
            placeholder={lng}
            variant="outlined">
            {currentBusiness.lng}
          </TextField>
          <TextField
            className={classes.businessInfo}
            onChange={updateAddress}
            value={address}
            label="Address"
            placeholder={address}
            variant="outlined">
            {currentBusiness.address}
          </TextField>
          <TextField
            className={classes.businessInfo}
            onChange={updateCity}
            value={city}
            label="City"
            placeholder={city}
            variant="outlined">
            {currentBusiness.city}
          </TextField>
          <TextField
            className={classes.businessInfo}
            onChange={updateStateLocation}
            value={stateLocation}
            label="State"
            placeholder={stateLocation}
            variant="outlined">
            {currentBusiness.state}
          </TextField>
          <TextField
            className={classes.businessInfo}
            onChange={updateZipcode}
            value={zipcode}
            label="Zipcode"
            placeholder={zipcode}
            variant="outlined">
            {currentBusiness.zipcode}
          </TextField>
          <TextField
            className={classes.businessInfo}
            onChange={updateWebsite}
            value={website}
            label="Website"
            placeholder={website}
            variant="outlined">
            {currentBusiness.website}
          </TextField>
          <TextField
            className={classes.businessInfo}
            onChange={updateContact}
            value={contact}
            label="Contact info"
            placeholder={contact}
            variant="outlined">
            {currentBusiness.contact}
          </TextField>
        </div>
      </>
        :
    <CurrentBusinessDisplay currentBusiness={currentBusiness} />

    }
        {currentUserId === 1 ?
          <>
        {!editBusiness ?
          <>
              <Button
                onClick= { () => {
                  setEditBusiness(!editBusiness)
                  setName(currentBusiness.name)
                  setAddress(currentBusiness.address)
                  setCity(currentBusiness.city)
                  setStateLocation(currentBusiness.state)
                  setZipcode(currentBusiness.zipcode)
                  setWebsite(currentBusiness.website)
                  setContact(currentBusiness.contact)
                  setLat(currentBusiness.lat)
                  setLng(currentBusiness.lng)
                }}
                className={classes.reviewButton}>
              Edit Business
              </Button>
              <Button
              onClick={() => handleOpen3()}
              className={classes.bigSaveButton}>
              Delete Business
              </Button>
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={open3}
                onClose={handleClose3}
                autoHideDuration={10000}
                message= "Are you sure you want to delete"
                action=
                {
                  <Button
                    className={classes.deleteReviewButton}
                    onClick={()=> sendDeleteBusiness(currentBusiness.id)}
                    >
                    Delete
                  </Button>
                }
                />
          </>
              :
              <Button
                className={classes.bigSaveButton}
                onClick={() => updateBusiness(currentBusiness.id)}>
                Save
              </Button>}
          </>
        : null}
      </>
  )
}
