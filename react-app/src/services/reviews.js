export const submitReview = async (title, body, rating) => {
  const response = await fetch("/api/reviews/submitReview", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
      rating,
    }),
  });
  return await response.json();
}
