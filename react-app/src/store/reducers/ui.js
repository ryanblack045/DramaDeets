import {SET_LANDING_PAGE} from '../actions/ui'

export default function reducer(state = {}, action) {
  Object.freeze(state);
  let newState = Object.assign({}, state)
  switch (action.type) {

    case SET_LANDING_PAGE:
      newState["landingPage"] = action.page
      return newState
    default:
      return state;
  }
}
