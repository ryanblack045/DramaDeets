import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
}));
export function CurrentBusinessDisplay({ currentBusiness }) {
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
