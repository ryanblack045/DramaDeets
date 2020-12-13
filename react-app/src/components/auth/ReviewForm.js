import React, { useState } from "react";
import { submitReview } from "../../services/reviews";
import { useDispatch, useSelector } from 'react-redux';
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


const ReviewForm = ({authenticated, setAuthenticated, open, setOpen}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState("");
  const dispatch = useDispatch();
  const business_id = useSelector((state) => (state.session.currentBusiness.id))
  const user_id = useSelector((state) => (state.session.currentUser.id))

  const useStyles = makeStyles((theme) => ({
    button: {
      background: "red",
      color: "white",
      marginTop: "1em",
      "&:hover": {
        backgroundColor: "#780202"
      },
    },
    input: {
      borderRadius: "1em",
      backgroundColor: "white",
      marginTop: ".5em",
      marginBottom: ".5em"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "15em",
    },
    reviewForm: {
      marginTop: "2.5em",
      marginBottom: "1em"
    }
  }));
  const classes = useStyles();

  const onSubmitReview = async (e) => {
    e.preventDefault();
      const review = await submitReview(user_id, business_id, title, body, rating);
    if (!review.errors) {
      const business = await getBusiness(business_id);
      dispatch(setCurrentBusiness(business))
        setOpen(false)
      }
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
        {/* <TextField
          className={classes.input}
          variant="outlined"
          label="Rating(1-10)"
          type="text"
          name="rating"
          onChange={updateRating}
          value={rating}
        /> */}
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
  );
};

export default ReviewForm;
