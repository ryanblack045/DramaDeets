import React, { useState } from "react";
import { submitReview } from "../../services/reviews";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentBusiness } from '../../store/actions/session'
import { getBusiness} from "../../services/businesses";


const ReviewForm = ({authenticated, setAuthenticated, open, setOpen}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState("");
  const dispatch = useDispatch();
  const business_id = useSelector((state) => (state.session.currentBusiness.id))
  const user_id = useSelector((state) => (state.session.currentUser.id))


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
    <form onSubmit={onSubmitReview}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          onChange={updateTitle}
          value={title}
        ></input>
      </div>
      <div>
        <label>Your Review</label>
        <input
          type="text"
          name="body"
          onChange={updateBody}
          value={body}
        ></input>
      </div>
      <div>
        <label>Rating (1-10)</label>
        <input
          type="text"
          name="rating"
          onChange={updateRating}
          value={rating}
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default ReviewForm;
