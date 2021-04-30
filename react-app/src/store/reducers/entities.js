import {GET_ALL_BUSINESSES, GET_BUSINESS_TYPES} from '../actions/entities'

export default function reducer(state = {}, action) {
  Object.freeze(state);
  let newState = Object.assign({}, state)
  switch (action.type) {

    case GET_BUSINESS_TYPES:
      newState["businessTypes"] = { byId: [] }
      console.log(action.businessType, "Business Type")
      let typeData = action.businessType.map(each => {
        return {
          id: each.id,
          title: each.title,
          businesses: each.businesses
        }
      })
      typeData.forEach(each => {
        newState.businessTypes.byId = [...newState.businessTypes.byId, each]
     })
      return newState

    case GET_ALL_BUSINESSES:
      newState["businesses"] = { byId: {}, allId: [] }
      let mappedData = action.business.map(each => {
        return {
          id: each.id,
          description: each.description,
          name: each.name,
          lat: each.lat,
          lng: each.lng,
          address: each.address,
          city: each.city,
          state: each.state,
          zipcode: each.zipcode,
          website: each.website,
          contact: each.contact,
          imgURL: each.imgURL,
          reviews: each.reviews,
          types: each.types
        }

      })
      mappedData.forEach(each => {
        newState.businesses.byId[each.id] = { ...each }
        newState.businesses.allId=[...newState.businesses.allId, each.id]
     })
      return newState


    default:
      return state;
  }
}
