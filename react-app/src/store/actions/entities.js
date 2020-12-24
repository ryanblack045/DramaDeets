export const GET_ALL_BUSINESSES = 'dramaDeets/entities/GET_ALL_BUSINESSES';
export const GET_BUSINESS_TYPES = 'dramaDeets/entities/GET_BUSINESS_TYPES';

export const getAllBusinesses = business => ({ type: GET_ALL_BUSINESSES, business });
export const getAllTypes = businessType => ({ type: GET_BUSINESS_TYPES, businessType });
