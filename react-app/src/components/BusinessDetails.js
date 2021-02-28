import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import { useSelector, useDispatch } from "react-redux";
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
import Map from './Map'
import { addingLike, deletingLike, sendUpdatedReviw, deleteReview } from '../services/reviews'
import { getBusiness, sendUpdatedBusiness, deleteBusiness, fetchBusinesses} from "../services/businesses";
import { ReviewModal } from './ReviewModal'
import { EditBusinessForm } from './EditBusinessForm'

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
    background: "black",
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
    textAlign: "center",
    fontSize: "1.25em"
    // display: "inline",
    // float: "right"
  },
  businessImg: {
    display: "inline-block",
    height: "20%",
    width: "20%",
    float: "middle",
    marginRight: "2em"
  },
  businessInfo: {
    width: "30em",
    margin: ".5em"
  },
  businessInfoContainer: {
    display: "inline-block",
    float: "middle",
  },
  businessInfoHolder: {
    flexDirection: "column",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  businessParentContainer: {
    display: "flex",
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
  reviewsHeader: {
    fontSize: "2em",
    textAlign: "center"
  },
  root: {
    flexGrow: 1,
  },
  reviewBody: {
    wordWrap:"break-word"
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


export default function BusinessDetail({ currentReviews2 }) {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
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
//https://github.com/facebook/react/issues/14476#issuecomment-471199055 take a look into this
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
           return each.id
        }
      }
      return
    })
    let likeToDelete = like[0].id
    const deletedLike = await deletingLike(likeToDelete)
    const business = await getBusiness(currentBusiness.id);
      dispatch(setCurrentBusiness(business))
      return like[0].id
  }

// deletes review
   const sendDeleteReview = async (currentReviewId) =>{
      await deleteReview(currentReviewId)
      const business = await getBusiness(currentBusiness.id);
      dispatch(setCurrentBusiness(business))
      return
   }

// handles opening review modal
const handleOpen = () => {
  setOpen(true);
};

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
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

  // const updateName = e => {
  //   setName(e.target.value)
  // }

  // const updateAddress = e => {
  //   setAddress(e.target.value)
  // }

  // const updateCity = e => {
  //   setCity(e.target.value)
  // }

  // const updateStateLocation = e => {
  //   setStateLocation(e.target.value)
  // }

  // const updateZipcode = e => {
  //   setZipcode(e.target.value)
  // }

  // const updateWebsite = e => {
  //   setWebsite(e.target.value)
  // }

  // const updateContact = e => {
  //   setContact(e.target.value)
  // }

  // const updateLat = e => {
  //   setLat(e.target.value)
  // }

  // const updateLng = e => {
  //   setLng(e.target.value)
  // }

  const updateReview = async (currentReviewId) => {
    await sendUpdatedReviw(currentReviewId, title, body, rating)
    const business = await getBusiness(currentBusiness.id);
    setEdit(!edit)
    dispatch(setCurrentBusiness(business))
  }



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
            <EditBusinessForm
              edit={edit}
              setEdit={setEdit}
              currentUserId={currentUserId}
              currentBusiness={currentBusiness}
            />
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

            <ReviewModal
              currentBusinessId={currentBusinessId}
              currentUserId={currentUserId}
              open={open}
              setOpen={setOpen} />

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
