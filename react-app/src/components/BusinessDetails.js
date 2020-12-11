import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from "react-redux";
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import ReviewForm from './auth/ReviewForm'
import {
  Modal,
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper
} from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import { setCurrentBusiness } from '../store/actions/session'
import Map from './Map'
import { addingLike } from '../services/reviews'
import { getBusiness} from "../services/businesses";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: "1.5px",
    color: theme.palette.text.secondary,
  },
  businessTitle: {
    fontSize: "3em",
    textAlign: "center"
  },
  pageBreak: {
    width: "100%",
    borderBottom: "2px solid black",
  },
  reviewsHeader: {
    fontSize: "2em",
    textAlign: "center"
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
  dislikeButton: {
    color: "red",
    cursor: "pointer",
  },
  edit: {
    marginLeft: "20em",
    background: "black",
    color: "white",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "#2d6a4f"
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
      if (eachReview.userId == currentUserId) {
        return eachReview
      }
     return
    })
    return reviewChecker
  }

  // determines whether the review button displays
  const canReviewArray = canReview(currentUserId)

  // function canLike(currentUserId) {
  //   let reviewChecker = currentReviews.filter(eachReview => {
  //     eachReview.judgements.filter(judgement => {
  //       if (judgement.userId == currentUserId) {
  //         console.log(judgement, "judgement")
  //       } else {
  //         console.log(judgement, "judgment not working")
  //       }
  //     })
  //   }
  //   )

  //   return reviewChecker
  // }
// determines if user can like a review
  // canLike(currentUserId)

// likes a review
  const postLike = async (currentReviewId) => {
    let recommend = true
    let avoid = false
    const like = await addingLike(currentUserId, currentReviewId, currentBusiness.id, recommend, avoid)
    const business = await getBusiness(currentBusiness.id);
      dispatch(setCurrentBusiness(business))
  }

  const deleteLike = async (currentJudgmentId) => {
    console.log(currentJudgmentId)
  }

// handles opening review modal
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


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
    const newJudgement = new Object()
    // {}
    newJudgement["like"] = 0
    newJudgement["dislike"] = 0
    newJudgement["userLikes"]=0
    //  newJudgement = {like:0, dislike:0}
    filteredObject.forEach(each=>{
        if (!each.avoid){
            newJudgement.like ++
        } else {
            newJudgement.dislike ++
        }
    })
    filteredObject.forEach(each=>{
      if (each.userId == currentUserId){
          newJudgement.userLikes ++
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
            <img className={classes.businessImg} src={currentBusiness.imgURL} />
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
                  <Grid item xs={6}>
                     <Card className={classes.card}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            "{currentReview.title}"
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                           {currentReview.body}
                          </Typography>
                        </CardContent>
                      <CardActions>
                        {currentReview.judgements.userLikes < 1 ?
                          <ThumbUp onClick={()=>postLike(currentReview.id)} className={classes.likeButton} />
                        : <ThumbUp onClick={()=>deleteLike(each.judgements)} className={classes.likeButtonDisabled} />}
                        <div>{currentReview.judgements.like}</div>
                        <ThumbDown className={classes.dislikeButton} />
                        <div>{currentReview.judgements.dislike}</div>
                        {currentReview.userId == currentUserId ?
                          <Button className={classes.edit}>Edit</Button>
                          : ""}
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
