import React from 'react'
import BusinessStyles from '../styles/BusinessStyles'


  export function CurrentBusinessDisplay({ currentBusiness }) {
  const useStyles = BusinessStyles()
  const classes = useStyles();
    // gives avg rating of business
    const ratingCalculator = (currentBusiness) => {
      let ratingSum = 0
      const numOfReviews = currentBusiness.reviews.length
      currentBusiness.reviews.forEach(review => {
        ratingSum += review.rating
      })
      return (ratingSum/numOfReviews.toFixed(1))
    }
  return (
    <>
    <div className={classes.businessParentContainer}>
    <img className={classes.businessImg} src={currentBusiness.imgURL} alt="Headshot of actress" />
  <div className={classes.businessInfoContainer}>
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
        </div>
  </div>
  </>
  )
}
