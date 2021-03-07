import React from 'react';
import { MyModal } from './Modal'
import ReviewStyles from '../styles/ReviewStyles'
import  ReviewForm from './forms/ReviewForm'
import { Button } from '@material-ui/core';
import { ListofReviews } from './ListofReviews';

export default function Reviews({ currentBusiness, currentUserId, edit, setEdit, currentBusinessId }) {
  const [open, setOpen] = React.useState(false);
  const currentReviews = currentBusiness.reviews;
  const useStyles = ReviewStyles()
  const classes = useStyles();

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

    <MyModal
        currentBusinessId={currentBusinessId}
        currentUserId={currentUserId}
        open={open}
        setOpen={setOpen}
        Form={ReviewForm}/>

      <ListofReviews
        ReviewStyles={ReviewStyles}
        classes={classes}
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
