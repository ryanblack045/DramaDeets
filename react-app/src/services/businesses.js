export const fetchBusinesses = async () => {
  const response = await fetch('/api/business/', {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const business = await response.json();
  return business.businesses
}

export const getBusiness = async (id) => {
  const response = await fetch(`/api/business/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const business = await response.json();
  return business
}

export const addBusinessType = async (business_id, typeId) => {
  const response = await fetch(`/api/business/${business_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      business_id,
      typeId
    }),
  });
  return await response.json();
}

export const newBusiness = async (user_id, name, description,
  lat, lng, address, city, state, zipcode, website, contact, imgURL) => {
  const response = await fetch(`/api/business/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      name,
      description,
      lat,
      lng,
      address,
      city,
      state,
      zipcode,
      website,
      contact,
      imgURL,
    }),
  });
  return await response.json();
}
