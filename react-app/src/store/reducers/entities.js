import {GET_ALL_BUSINESSES} from '../actions/entities'

export default function reducer(state = {}, action) {
  Object.freeze(state);
  let newState = Object.assign({}, state)
  switch (action.type) {
    case GET_ALL_BUSINESSES:
      newState =
         action.business
        // id: action.business.id,
        // description: action.business.description,
        // lat: action.business.lat,
        // lng: action.business.lng,
        // address: action.business.address,
        // state: action.business.state,
        // zipcode: action.business.zipcode,
        // imgURL: action.business.imgURL
      return newState
    default:
      return state;
  }
}
