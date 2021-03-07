import React, { useState } from "react";
import { submitReview } from "../../services/reviews";
import { useDispatch } from 'react-redux';
import { setCurrentBusiness } from '../../store/actions/session'
import { getBusiness } from "../../services/businesses";
import {
  Button,
  TextField,
  makeStyles,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import ReviewFormStyles from '../../styles/ReviewFormStyles'


const ReviewForm = ({currentUserId, currentBusinessId, setOpen}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState("");
  const dispatch = useDispatch();
  const useStyles = ReviewFormStyles()
  const classes = useStyles();

  const onSubmitReview = async (e) => {
    e.preventDefault();
      const review = await submitReview(currentUserId, currentBusinessId, title, body, rating);
    if (!review.errors) {
      const business = await getBusiness(currentBusinessId);
      dispatch(setCurrentBusiness(business))
    }
    setOpen(false)
    }

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateBody = (e) => {
    setBody(e.target.value);
  };

  const updateRating = (e) => {
    setRating(e.target.value);
  };

  return (
    <>
    <div>
    <div className={classes.reviewTitle}>
      <br></br>
      Review form.
    </div>
    <span className={classes.reviewSubheader}>Be </span>
    <span className={classes.reviewSubheaderBold}>fair</span>
    <span className={classes.reviewSubheader}>, be </span>
    <span className={classes.reviewSubheaderBold}>respectful.<br></br></span>
    <span className={classes.reviewSubheader}> Toxic posts will be </span>
    <span className={classes.reviewSubheaderBold}>deleted</span>
  </div>
    <form
      className={classes.reviewForm}
      onSubmit={onSubmitReview}
    >
      <div>
        <TextField
          className={classes.input}
          variant="outlined"
          label="Title"
          type="text"
          name="title"
          onChange={updateTitle}
          value={title}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          label="Your review"
          multiline
          rows={6}
          type="text"
          name="body"
          onChange={updateBody}
          value={body}
        />
        <br></br>
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
          label="Age"
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
      <Button
        className={classes.button}
        variant="contained"
        type="submit">
        Submit
      </Button>
      </form>
    </>
  );
};

export default ReviewForm;
