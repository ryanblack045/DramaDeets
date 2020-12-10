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
