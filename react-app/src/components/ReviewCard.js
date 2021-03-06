import React from 'react'
import { useDispatch } from 'react-redux'
import { getBusiness } from '../services/businesses'
import { setCurrentBusiness } from '../store/actions/session'
import EditReviewForm from './EditReviewForm'
import {
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  Snackbar,
} from '@material-ui/core';
import { sendUpdatedReview, deleteReview  } from '../services/reviews'
import LikesDislikes from './LikesDislikes'


export default function ReviewCard({
  edit,
  each,
  classes,
  currentReview,
  currentUserId,
  setEdit,
  currentBusiness }) {

  const [open2, setOpen2] = React.useState(false);
  const [title, setTitle] = React.useState("")
  const [body, setBody] = React.useState("")
  const [rating, setRating] = React.useState("")
  const dispatch = useDispatch()

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const updateReview = async (currentReviewId, title, body, rating, currentBusiness, edit, setEdit) => {
    await sendUpdatedReview(currentReviewId, title, body, rating)
    const business = await getBusiness(currentBusiness.id);
    setEdit(!edit)
    dispatch(setCurrentBusiness(business))
  }

  // deletes review
  const sendDeleteReview = async (currentReviewId, currentBusiness) =>{
    await deleteReview(currentReviewId)
    const business = await getBusiness(currentBusiness.id);
    dispatch(setCurrentBusiness(business))
    return
  }

  return (
    <Card className={classes.cardContainer} >
        <CardContent className={classes.card}>
        {edit && currentReview.userId === currentUserId || edit && currentUserId === 1 ?
          <EditReviewForm
            classes={classes}
            currentReview={currentReview}
            title={title}
            body={body}
            rating={rating}
            setBody={setBody}
            setTitle={setTitle}
            setRating={setRating}
          />
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
                    onClick={()=> sendDeleteReview(currentReview.id, currentBusiness)}
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
        <LikesDislikes
          each={each}
          currentReview={currentReview}
          currentBusiness={currentBusiness}
          currentUserId={currentUserId}
          classes={classes}
          />
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
                onClick={() => updateReview(currentReview.id, title, body, rating, currentBusiness, edit, setEdit)} >
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
  )
}
