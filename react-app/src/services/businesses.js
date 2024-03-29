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

export const newBusinessType = async (title) => {
  const response = await fetch(`/api/business/types`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title } ),
  });
  const newType = await response.json();
  console.log(newType, "newType")
  return newType
}

export const fetchTypes = async () => {
  const response = await fetch('/api/business/types', {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const type = await response.json();
  return type.types
}

export const sendUpdatedBusiness = async (id, name, lat, lng, address, city, state, zipcode, website, contact) => {
  const response = await fetch(`api/business/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
      lat,
      lng,
      address,
      city,
      state,
      zipcode,
      website,
      contact
    })
  })
    return await response.json();
}

export const deleteBusiness = async (id) => {
  const response = await fetch(`api/business/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    return await response.json();
}
