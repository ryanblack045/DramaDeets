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
  Paper
} from '@material-ui/core';
import { setCurrentBusiness } from '../store/actions/session'
import Map from './Map'
import { addingLike, deletingLike, sendUpdatedReviw } from '../services/reviews'
import { getBusiness} from "../services/businesses";


const useStyles = makeStyles((theme) => ({
  actionFooter: {
      justifyContent:"center"
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
  businessTitle: {
    fontSize: "3em",
    textAlign: "center"
  },
  card: {
    textAlign:"center"
  },
  dislikeButton: {
    color: "black",
    cursor: "pointer",
    marginLeft: "2em",
  },
  dislikeButtonDisabled: {
    marginLeft: "1em",
    color: "red",
    cursor: "pointer",
    marginLeft: "1em",
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
    marginLeft: "1em",
    color: "black",
    cursor: "pointer"
  },
  likeButtonDisabled: {
    marginLeft: "1em",
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
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    borderRadius: 16,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  root: {
    flexGrow: 1,
  },
  saveButton: {
    background: "red",
    height: "1.5em",
    color: "white",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
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
  const [modalStyle] = React.useState(getModalStyle);
  const [edit, setEdit] = React.useState(false);
  const [title, setTitle] = React.useState("")
  const [body, setBody] = React.useState("")
  const [rating, setRating]= React.useState("")
  const classes = useStyles();
  const businesses = useSelector((state)=>(state.entities.businesses))
  const currentBusiness = useSelector((state) => (state.session.currentBusiness));
  const currentUserId = useSelector((state) => (state.session.currentUser.id));
  const currentReviews = currentBusiness.reviews;
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("did it")
    dispatch(setCurrentBusiness(currentBusiness))
  }, [businesses,dispatch])

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

// handles opening review modal
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const updateReview = async (currentReviewId) => {
    await sendUpdatedReviw(currentReviewId, title, body, rating)
    const business = await getBusiness(currentBusiness.id);
    setEdit(!edit)
    dispatch(setCurrentBusiness(business))
  }


  const submitReviewModal = (
    <div style={modalStyle} border="none" className={classes.reviewModal}>
      <ReviewForm className={classes.reviewForm}
        open={open}
        setOpen={setOpen}/>
    </div>
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
      <Grid container spacing={3}>
        <Grid item className={classes.buinessContainer} spacing={0} xs={12}>
          <Paper className={classes.paper}>
            <img className={classes.businessImg} src={currentBusiness.imgURL} alt="Headshot of actress" />
            <div className={classes.businessTitle}>{currentBusiness.name}</div>
            <div className={classes.businessCSZ}>{currentBusiness.address}</div>
            <div className={classes.businessCSZ}>
              {currentBusiness.city}, {currentBusiness.state} {currentBusiness.zipcode}
            </div>
            <div className={classes.businessCSZ}>
              <a href={currentBusiness.website}>{currentBusiness.website}</a>
            </div>
            <div className={classes.businessCSZ}>Contact: {currentBusiness.contact}</div>
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
                     <Card >
                        <CardContent className={classes.card}>
                        { edit && currentReview.userId === currentUserId ?
                          <>
                            <div className={classes.editContainer}>
                              <TextField
                                className={classes.title}
                                value={title}
                                onChange={updateTitle}
                                label="Title"
                                placeholder={currentReview.title}
                                variant="outlined"/>
                              <TextField
                                className={classes.body}
                                multiline
                                onChange={updateBody}
                                value={body}
                                label="Description"
                                placeholder={currentReview.body}
                                variant="outlined"/>
                              <TextField
                                placeholder={currentReview.rating}
                                label="Rating 1-10"
                                onChange={updateRating}
                                value={rating}
                                variant="outlined"/>
                            </div>
                          </>
                          :
                        <>
                         <Typography gutterBottom variant="h5" component="h2">
                          "{currentReview.title}"
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                           {currentReview.body}
                          </Typography>
                        </>
                        }
                        </CardContent>
                      <CardActions spacing={0} className={classes.actionFooter}>
                        {currentReview.judgements.userLikes < 1 ?
                          <ThumbUp onClick={()=>postLike(currentReview.id)} className={classes.likeButton} />
                        : <ThumbUp onClick={()=>deleteLike(each.judgements)} className={classes.likeButtonDisabled} />}
                        <div>Agree ({currentReview.judgements.like})</div>
                        {currentReview.judgements.userDislikes < 1 ?
                          <ThumbDown onClick={()=>postDislike(currentReview.id)} className={classes.dislikeButton} />
                        : <ThumbDown onClick={()=>deleteDislike(each.judgements)} className={classes.dislikeButtonDisabled} />}
                        <div>Disagree ({currentReview.judgements.dislike})</div>
                        {currentReview.userId === currentUserId ?
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
