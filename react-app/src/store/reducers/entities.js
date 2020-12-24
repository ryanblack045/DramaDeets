import {GET_ALL_BUSINESSES, GET_BUSINESS_TYPES} from '../actions/entities'

export default function reducer(state = {}, action) {
  console.log("reducer called")
  Object.freeze(state);
  let newState = Object.assign({}, state)
  switch (action.type) {

    case GET_BUSINESS_TYPES:
      console.log("inside types reducer")
      newState["businessTypes"] = { byId: {} }
      let typeData = action.businessType.map(each => {
        console.log(each, "each--")
        return {
          id: each.id,
          title: each.title
        }
      })
      typeData.forEach(each => {
        newState.businessTypes.byId[each.id] = { ...each }
     })
      return newState

    case GET_ALL_BUSINESSES:
      console.log("inside business reducer")
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
