import React from 'react';
import { useDispatch } from "react-redux";
import { ReviewModal } from './ReviewModal'
import { addingLike, deletingLike, sendUpdatedReviw, deleteReview } from '../services/reviews'

import ReviewStyles from '../styles/ReviewStyles'
import {
  TextField,
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  Grid,
  Snackbar,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import { ListofReviews } from './ListofReviews';

export default function Reviews({ currentBusiness, currentUserId, edit, setEdit, currentBusinessId }) {
  const [open, setOpen] = React.useState(false);
  const currentReviews = currentBusiness.reviews;
  const classes = ReviewStyles()
  const dispatch = useDispatch()

  //Determines whether a user can review a business or not (only allowed one review per business)
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
  const canReviewArray = canReview(currentUserId, currentReviews)

//   const updateReview = async (currentReviewId) => {
//     await sendUpdatedReviw(currentReviewId, title, body, rating)
//     const business = await getBusiness(currentBusiness.id);
//     setEdit(!edit)
//     dispatch(setCurrentBusiness(business))
//   }

//   // deletes review
//   const sendDeleteReview = async (currentReviewId) =>{
//     await deleteReview(currentReviewId)
//     const business = await getBusiness(currentBusiness.id);
//     dispatch(setCurrentBusiness(business))
//     return
//   }

//   // likes a review
//   const postLike = async (currentReviewId) => {
//     let recommend = true
//     let avoid = false
//     await addingLike(currentUserId, currentReviewId, currentBusiness.id, recommend, avoid)
//     const business = await getBusiness(currentBusiness.id);
//       dispatch(setCurrentBusiness(business))
//   }



// // deletes a like on a review
//   const deleteLike = async (currentJudgmentId) => {
//     let like= currentJudgmentId.filter(each => {
//      if (each.recommend === true) {
//        if (each.userId === currentUserId) {
//            return each.id
//         }
//       }
//       return
//     })
//     let likeToDelete = like[0].id
//     await deletingLike(likeToDelete)
//     const business = await getBusiness(currentBusiness.id);
//       dispatch(setCurrentBusiness(business))
//       return like[0].id
//   }

// //adds a dislike to a review
//   const postDislike = async (currentReviewId) => {
//     let recommend = false
//     let avoid = true
//     await addingLike(currentUserId, currentReviewId, currentBusiness.id, recommend, avoid)
//     const business = await getBusiness(currentBusiness.id);
//       dispatch(setCurrentBusiness(business))
//   }

//   // deletes dislike
//   const deleteDislike = async (currentJudgmentId) => {
//     let like= currentJudgmentId.filter(each => {
//      if (each.avoid === true) {
//        if (each.userId === currentUserId) {
//            return each.id
//         }
//       }
//       return
//     })
//     let likeToDelete = like[0].id
//     await deletingLike(likeToDelete)
//     const business = await getBusiness(currentBusiness.id);
//       dispatch(setCurrentBusiness(business))
//       return like[0].id
//   }


  // handles opening review modal
  const handleOpen = () => {
    setOpen(true);
};

  return (
    <>
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

      <ListofReviews
        ReviewStyles={ReviewStyles}
        currentReviews={currentReviews}
        currentBusiness={currentBusiness}
        currentUserId={currentUserId}
        edit={edit}
        setEdit={setEdit}
        currentBusinessId={currentBusinessId}
      />
  </>
)
}
