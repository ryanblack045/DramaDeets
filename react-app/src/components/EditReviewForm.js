import React from 'react'
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

export default function EditReviewForm({
  classes,
  currentReview,
  title,
  body,
  rating,
  setTitle,
  setBody,
  setRating}) {


  const updateTitle = e => {
    setTitle(e.target.value)
  }

  const updateBody = e => {
    setBody(e.target.value)
  }

  const updateRating = e => {
    setRating(e.target.value)
  }
  return(
    <>
    <div className={classes.editContainer}>
      <TextField
        className={classes.title}
        value={title}
        onChange={updateTitle}
        label="Title"
        placeholder={title}
        variant="outlined">
        {currentReview.title}
      </TextField>
      <TextField
        className={classes.body}
        multiline
        rows={4}
        onChange={updateBody}
        value={body}
        label="Description"
        placeholder={body}
        variant="outlined">
        {currentReview.body}
      </TextField>
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
        label="Rating"
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
  </>
  )
}
