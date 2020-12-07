export const fetchBusinesses = async () => {
  const response = await fetch('/api/business/', {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const business = await response.json();
  console.log(business)
  return business.businesses
}
