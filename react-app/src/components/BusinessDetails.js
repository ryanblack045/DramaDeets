import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import { useSelector, useDispatch } from "react-redux";
import ReviewForm from './auth/ReviewForm'
import {
  TextField,
  Modal,
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Snackbar,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import { setCurrentBusiness } from '../store/actions/session'
import { setLandingPage } from '../store/actions/ui'
import { getAllBusinesses } from '../store/actions/entities'
import Map from './Map'
import { addingLike, deletingLike, sendUpdatedReviw, deleteReview } from '../services/reviews'
import { getBusiness, sendUpdatedBusiness, deleteBusiness, fetchBusinesses} from "../services/businesses";


const useStyles = makeStyles((theme) => ({
  actionFooter: {
      justifyContent:"center"
  },
  bigSaveButton: {
    display: "block",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    background: "red",
    "&:hover": {
      backgroundColor: "#890909"
    },
  },
  body: {
    color: "black",
    marginTop: "1em",
    marginBottom: "1em"
  },
  businessContainer: {
    width: "90"
  },
  businessCSZ: {
    textAlign: "center"
  },
  businessImg: {
    display: "block",
    textAlign: "center",
    height: "50%",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto"
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
  businessRating: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.25em"
  },
  businessTitle: {
    fontSize: "3em",
    textAlign: "center"
  },
  card: {
    textAlign:"center"
  },
  cardContainer: {
    boxShadow: " 5px 10px 8px #888888",
  },
  deleteReview: {
    cursor: "pointer",
    marginLeft: "90%",
    marginTop: "-1em",
    marginBottom: "-1em",
    fontWeight: "bold",
  },
  deleteReviewButton: {
    color: "white",
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "#780202"
    },
  },
  dislikeButton: {
    color: "black",
    cursor: "pointer",
    // marginLeft: "2em",
  },
  dislikeButtonDisabled: {
    // marginLeft: "1em",
    color: "red",
    cursor: "pointer",
  },
  edit: {
    background: "black",
    height: "1.5em",
    color: "white",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "#2d6a4f"
    },
  },
  editContainer: {
    display: "flex",
    flexDirection: "column"
  },
  likeButton: {
    color: "black",
    cursor: "pointer"
  },
  likeButtonDisabled: {
    color: "#74c69d",
    cursor: "pointer"
  },
  pageBreak: {
    width: "100%",
    borderBottom: "2px solid black",
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: "1px",
    boxShadow: "none",
    borderRadius: "0",
    color: theme.palette.text.secondary,
  },
  ratingLabel: {
    fontWeight: "bold"
  },
  reviewButton: {
    display: "block",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    background: "#74c69d",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "#2d6a4f"
    },
  },
  reviewsHeader: {
    fontSize: "2em",
    textAlign: "center"
  },
  reviewModal: {
    position: 'absolute',
    width: 400,
    height: 600,
    backgroundColor: "#1b4332",
    outline: "none",
    borderRadius: 16,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
  reviewModalHeader: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
  },
  reviewTitle: {
    fontSize: "3em",
    lineHeight: ".75em",
    fontFamily: "brandon-grotesque, sans-serif",
    marginBottom: ".5em",
  },
  root: {
    flexGrow: 1,
  },
  reviewBody: {
    wordWrap:"break-word"
  },
  reviewSubheader: {
    fontSize: "1.3em"
   },
  reviewSubheaderBold: {
    fontSize: "1.3em",
    fontWeight: "bold",
    textDecoration: "underline"
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

function getModalStyle() {
  const top =  50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    border: "none",
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function BusinessDetail({ currentReviews2 }) {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [edit, setEdit] = React.useState(false);
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
  const [title, setTitle] = React.useState("")
  const [body, setBody] = React.useState("")
  const [rating, setRating]= React.useState("")
  const classes = useStyles();
  const businesses = useSelector((state)=>(state.entities.businesses))
  const currentBusiness = useSelector((state) => (state.session.currentBusiness));
  const currentBusinessId = useSelector((state) => (state.session.currentBusiness.id));
  const currentUserId = useSelector((state) => (state.session.currentUser.id));
  const currentReviews = currentBusiness.reviews;
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentBusiness(currentBusiness))
  }, [businesses])

  function canReview(currentUserId) {
   let reviewChecker= currentReviews.filter(eachReview => {
      if (eachReview.userId === currentUserId) {
        return eachReview
      }
      return null
    })
    return reviewChecker
  }

  // determines whether the review button displays
  const canReviewArray = canReview(currentUserId)

// likes a review
  const postLike = async (currentReviewId) => {
    let recommend = true
    let avoid = false
    const like = await addingLike(currentUserId, currentReviewId, currentBusiness.id, recommend, avoid)
    const business = await getBusiness(currentBusiness.id);
      dispatch(setCurrentBusiness(business))
  }

  // gives avg rating of business
  const ratingCalculator = (currentBusiness) => {
    let ratingSum = 0
    const numOfReviews = currentBusiness.reviews.length
    currentBusiness.reviews.forEach(review => {
      ratingSum += review.rating
    })
    return (ratingSum/numOfReviews.toFixed(1))
  }

// deletes a like on a review
  const deleteLike = async (currentJudgmentId) => {
    let like= currentJudgmentId.filter(each => {
     if (each.recommend === true) {
       if (each.userId === currentUserId) {
           return each.id
        }
      }
      return
    })
    let likeToDelete = like[0].id
    const deletedLike = await deletingLike(likeToDelete)
    const business = await getBusiness(currentBusiness.id);
      dispatch(setCurrentBusiness(business))
      console.log(likeToDelete, "please")
      return like[0].id
  }

//adds a dislike to a review
  const postDislike = async (currentReviewId) => {
    let recommend = false
    let avoid = true
    const like = await addingLike(currentUserId, currentReviewId, currentBusiness.id, recommend, avoid)
    const business = await getBusiness(currentBusiness.id);
      dispatch(setCurrentBusiness(business))
  }

// deletes dislike
  const deleteDislike = async (currentJudgmentId) => {
    let like= currentJudgmentId.filter(each => {
     if (each.avoid === true) {
       if (each.userId === currentUserId) {
         console.log(each.id,"this")
           return each.id
        }
      }
      return
    })
    let likeToDelete = like[0].id
    const deletedLike = await deletingLike(likeToDelete)
    const business = await getBusiness(currentBusiness.id);
      dispatch(setCurrentBusiness(business))
      console.log(likeToDelete, "please")
      return like[0].id
  }

// deletes review
   const sendDeleteReview = async (currentReviewId) =>{
      await deleteReview(currentReviewId)
      const business = await getBusiness(currentBusiness.id);
      dispatch(setCurrentBusiness(business))
      return
   }

//delets business
   const sendDeleteBusiness = async (businessId) =>{
     await deleteBusiness(businessId)
     const businesses = await fetchBusinesses()
     dispatch(getAllBusinesses(businesses))
     dispatch(setLandingPage(true))
    return
}

// handles opening review modal
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const updateTitle = e => {
    setTitle(e.target.value)
  }

  const updateBody = e => {
    setBody(e.target.value)
  }

  const updateRating = e => {
    setRating(e.target.value)
  }

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

  const updateReview = async (currentReviewId) => {
    await sendUpdatedReviw(currentReviewId, title, body, rating)
    const business = await getBusiness(currentBusiness.id);
    setEdit(!edit)
    dispatch(setCurrentBusiness(business))
  }

  const updateBusiness = async (currentBusinessId) => {
    await sendUpdatedBusiness(currentBusinessId, name, lat, lng, address, city, stateLocation, zipcode, website, contact)
    const business = await getBusiness(currentBusinessId);
    setEditBusiness(!editBusiness)
    dispatch(setCurrentBusiness(business))
  }




  const submitReviewModal = (
    <>
    <div style={modalStyle} border="none" className={classes.reviewModal}>
      <Paper className={classes.reviewModalHeader}>
        <div>
          <div className={classes.reviewTitle}>
            <br></br>
            Review form.
          </div>
          <span className={classes.reviewSubheader}>Be </span>
          <span className={classes.reviewSubheaderBold}>fair</span>
          <span className={classes.reviewSubheader}>, be </span>
          <span className={classes.reviewSubheaderBold}>respectful.<br></br></span>
          <span className={classes.reviewSubheader}> Toxic posts will be </span>
          <span className={classes.reviewSubheaderBold}>deleted</span>
        </div>
        <ReviewForm className={classes.reviewForm}
          open={open}
          setOpen={setOpen}
        />
      </Paper>
    </div>
    </>
  );

  const counter = (obj) => {
    const newObject = Object.assign({}, obj)
    const filteredObject = newObject.judgements
    const newJudgement = {}
    // {}
    newJudgement["like"] = 0
    newJudgement["dislike"] = 0
    newJudgement["userLikes"] = 0
    newJudgement["userDislikes"] = 0
    //  newJudgement = {like:0, dislike:0}
    filteredObject.forEach(each=>{
        if (!each.avoid){
            newJudgement.like ++
        } else {
            newJudgement.dislike ++
        }
    })
    filteredObject.forEach(each => {
       //determines if a user can like or dislike a review
      if (each.userId === currentUserId && each.recommend === true) {
        newJudgement.userLikes++
      }

      if (each.userId === currentUserId && each.avoid === true) {
        newJudgement.userDislikes++
      }
      })
        newObject.judgements = newJudgement
        return newObject
    }

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item className={classes.buinessContainer} spacing={0} xs={12}>
          <Paper className={classes.paper}>
            <img className={classes.businessImg} src={currentBusiness.imgURL} alt="Headshot of actress" />
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
            <>
            <div className={classes.businessTitle}>{currentBusiness.name}</div>
            <div className={classes.businessCSZ}>{currentBusiness.address}</div>
            <div className={classes.businessCSZ}>
              {currentBusiness.city}, {currentBusiness.state} {currentBusiness.zipcode}
            </div>
            <div className={classes.businessCSZ}>
              <a href={currentBusiness.website}>{currentBusiness.website}</a>
            </div>
            <div className={classes.businessCSZ}>Contact: {currentBusiness.contact}</div>
            <div className={classes.businessRating}>Rating: {!ratingCalculator(currentBusiness) ? "No Reviews" : ratingCalculator(currentBusiness).toFixed(1) + `/10.0`}</div>
            </>
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

            <Map className={classes.map} />
            <div className={classes.pageBreak} />
            <div className={classes.reviewsHeader}>Reviews</div>
            {canReviewArray.length < 1 ?
              <>
              <Button className={classes.reviewButton} onClick={handleOpen}>
                  Submit a Review
              </Button>
                </>
              : ""}
              <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="Review form modal"
              aria-describedby="Review form"
              >
              {submitReviewModal}
            </Modal>
            <Grid container spacing={3}>

              {currentReviews.map((each) => {
                let currentReview = counter(each)

                return (
                  <Grid item xs={6} spacing={0}>
                     <Card className={classes.cardContainer} >
                        <CardContent className={classes.card}>
                        {edit && currentReview.userId === currentUserId || edit && currentUserId === 1 ?
                          <>
                            <div className={classes.editContainer}>
                              <TextField
                                className={classes.title}
                                value={title}
                                onChange={updateTitle}
                                label="Title"
                                placeholder={title}
                                variant="outlined">
                                {currentReview.title}
                              </TextField>
                              <TextField
                                className={classes.body}
                                multiline
                                rows={4}
                                onChange={updateBody}
                                value={body}
                                label="Description"
                                placeholder={body}
                                variant="outlined">
                                {currentReview.body}
                              </TextField>
                              <FormControl
                                className={classes.formControl}
                                variant="outlined"
                              >
                              <InputLabel id="demo-simple-select-outlined-label">Rating</InputLabel>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={rating}
                                onChange={updateRating}
                                label="Rating"
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                              </Select>
                            </FormControl>
                            </div>
                          </>
                          :
                          <>
                            {currentReview.userId === currentUserId || currentUserId === 1 ?
                            <>
                              <span
                                onClick={() => handleOpen2()}
                                className={classes.deleteReview}>
                                x
                              </span>
                              <Snackbar
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'center',
                                }}
                                open={open2}
                                onClose={handleClose2}
                                autoHideDuration={10000}
                                message= "Are you sure you want to delete"
                                action=
                                {
                                  <Button
                                    className={classes.deleteReviewButton}
                                    onClick={()=> sendDeleteReview(currentReview.id)}
                                    >
                                    Delete
                                  </Button>
                                }
                                />
                            </>
                            : ""}
                         <Typography gutterBottom variant="h5" component="h2">
                          "{currentReview.title}"
                          </Typography>
                          <Typography className={classes.reviewBody} variant="body2" color="textSecondary" component="p">
                           {currentReview.body}
                          </Typography>
                        </>
                        }
                        </CardContent>
                      <CardActions spacing={0} className={classes.actionFooter}>
                        {currentReview.judgements.userLikes < 1 ?
                          <ThumbUp onClick={()=>postLike(currentReview.id)} className={classes.likeButton} />
                        : <ThumbUp onClick={()=>deleteLike(each.judgements)} className={classes.likeButtonDisabled} />}
                        <div>Agree({currentReview.judgements.like})</div>
                        {currentReview.judgements.userDislikes < 1 ?
                          <ThumbDown onClick={()=>postDislike(currentReview.id)} className={classes.dislikeButton} />
                        : <ThumbDown onClick={()=>deleteDislike(each.judgements)} className={classes.dislikeButtonDisabled} />}
                        <div>Disagree({currentReview.judgements.dislike})</div>
                        {currentReview.userId === currentUserId || currentUserId === 1  ?
                          <div className={classes.editContainer}>
                            {!edit ? <Button
                              onClick= { () => {
                                setEdit(!edit)
                                setTitle(currentReview.title)
                                setBody(currentReview.body)
                                setRating(currentReview.rating)
                              }}
                              className={classes.edit}>
                              Edit
                              </Button>
                              :
                              <Button
                                className={classes.saveButton}
                                onClick={() => updateReview(currentReview.id)} >
                                Save
                                </Button>
                            }
                          </div>
                          : ""}
                          <div
                          className={classes.ratingLabel}>
                          Rating:{currentReview.rating}/10
                          </div>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              })
            }
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
