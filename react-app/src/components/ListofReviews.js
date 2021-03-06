import React from 'react'
import { Grid} from '@material-ui/core';
import ReviewCard from './ReviewCard'

export function ListofReviews({
  currentReviews,
  currentUserId,
  edit,
  classes,
  currentBusiness,
  setEdit }) {


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
    <Grid container spacing={3}>

      {currentReviews.map((each) => {
        let currentReview = counter(each)

          return (
            <Grid item xs={6} spacing={0}>
              <ReviewCard
                edit={edit}
                setEdit={setEdit}
                currentReview={currentReview}
                classes={classes}
                currentUserId={currentUserId}
                currentBusiness={currentBusiness}
                each={each}
              />
            </Grid>
          )
        })
      }

    </Grid>
  )
}
