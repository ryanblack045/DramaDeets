import {SET_CURRENT_USER, SET_CURRENT_BUSINESS, ADD_REVIEW} from '../actions/session'

export default function reducer(state = {}, action) {
  Object.freeze(state);
  let newState = Object.assign({}, state)
  switch (action.type) {

    case SET_CURRENT_USER:
      newState["currentUser"] = {
        id: action.user.id,
        userName: action.user.username,
        reviews: action.user.reviews
      }
      return newState

    case ADD_REVIEW:
      newState.currentBusiness = state.currentBusiness
      newState.currentBusiness.reviews = [...state.currentBusiness.reviews, action.review]
      return newState

    case SET_CURRENT_BUSINESS:
      newState["currentBusiness"] = {
        id: action.business.id,
        user_id: action.business.user_id,
        name: action.business.name,
        description: action.business.description,
        lat: action.business.lat,
        lng: action.business.lng,
        address: action.business.address,
        city: action.business.city,
        state: action.business.state,
        zipcode: action.business.zipcode,
        website: action.business.website,
        contact: action.business.contact,
        imgURL: action.business.imgURL,
        reviews: action.business.reviews,
        types: action.business.types
      }
      return newState

    default:
      return state;
  }
}
