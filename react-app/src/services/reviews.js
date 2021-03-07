
export const submitReview = async (user_id, business_id, title, body, rating) => {
  const response = await fetch(`/api/business/${business_id}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      business_id,
      title,
      body,
      rating,
    }),
  });
  return await response.json();
}


export const addingLike = async (user_id, review_id, business_id, recommend, avoid) => {
  const response = await fetch(`/api/reviews/${review_id}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      review_id,
      business_id,
      recommend,
      avoid
    }),
  });
  return await response.json();
}



export const deletingLike = async (likeId) => {
  const response = await fetch(`/api/reviews/like/${likeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}


export const sendUpdatedReview = async (review_id, title, body, rating) => {
  const response = await fetch(`api/reviews/${review_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      review_id,
      title,
      body,
      rating,
    })
  })
    return await response.json();
}

export const deleteReview = async (review_id) => {
  const response = await fetch(`api/reviews/${review_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    return await response.json();
}


  //Determines whether a user can review a business or not (only allowed one review per business)
  export function canReview(currentUserId, currentReviews) {
    let reviewChecker= currentReviews.filter(eachReview => {
       if (eachReview.userId === currentUserId) {
         return eachReview
       }
       return null
     })
     return reviewChecker
  }
