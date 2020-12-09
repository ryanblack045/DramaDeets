export const SET_CURRENT_USER = 'dramaDeets/session/SET_CURRENTUSER';
export const SET_CURRENT_BUSINESS= 'dramaDeets/session/SET_CURRENT_BUSINESS'

export const setCurrentUser = user => ({ type: SET_CURRENT_USER, user });
export const setCurrentBusiness = business => ({ type: SET_CURRENT_BUSINESS, business})
