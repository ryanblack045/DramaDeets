import React from 'react'
import { useDispatch} from 'react-redux'
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import { getBusiness } from "../services/businesses";
import { setCurrentBusiness } from '../store/actions/session'
import { addingLike, deletingLike,} from '../services/reviews'

export default function LikesDislikes({
  currentReview,
  currentBusiness,
  currentUserId,
  classes,
  each }) {

  const dispatch = useDispatch()

  // likes a review
  const postLike = async (currentReviewId) => {
    let recommend = true
    let avoid = false
    await addingLike(currentUserId, currentReviewId, currentBusiness.id, recommend, avoid)
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
      await deletingLike(likeToDelete)
      const business = await getBusiness(currentBusiness.id);
        dispatch(setCurrentBusiness(business))
        return like[0].id
    }

  //adds a dislike to a review
    const postDislike = async (currentReviewId) => {
      let recommend = false
      let avoid = true
      await addingLike(currentUserId, currentReviewId, currentBusiness.id, recommend, avoid)
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
      await deletingLike(likeToDelete)
      const business = await getBusiness(currentBusiness.id);
        dispatch(setCurrentBusiness(business))
        return like[0].id
    }

  return (
  <>
    {currentReview.judgements.userLikes < 1 ?
      <ThumbUp onClick={()=>postLike(currentReview.id)} className={classes.likeButton} />
    : <ThumbUp onClick={()=>deleteLike(each.judgements)} className={classes.likeButtonDisabled} />}
    <div>Agree({currentReview.judgements.like})</div>
    {currentReview.judgements.userDislikes < 1 ?
      <ThumbDown onClick={()=>postDislike(currentReview.id)} className={classes.dislikeButton} />
    : <ThumbDown onClick={()=>deleteDislike(each.judgements)} className={classes.dislikeButtonDisabled} />}
      <div>Disagree({currentReview.judgements.dislike})</div>
  </>
  )
}
