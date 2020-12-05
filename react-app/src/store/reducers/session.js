import {SET_CURRENT_USER} from '../actions/session'

export default function reducer(state = {}, action) {
  Object.freeze(state);
  let newState = Object.assign({}, state)
  switch (action.type) {
    case SET_CURRENT_USER:
      newState["currentUser"] = {
        id: action.user.id,
        userName: action.user.userName,
        reviews: action.user.reviews
      }
      return newState
    default:
      return state;
  }
}
