import Types from '../types';

const createAction = (type, params = null) => ({ type, ...params });

export const getBrands = payload =>
createAction(Types.GET_BRANDS, { payload })

export const selectBrand = payload =>
createAction(Types.BRAND_SELECTED, { payload })

export const attachUser = payload =>
createAction(Types.ATTACH_USER, { payload })

export const setFollowedBrands = payload =>
createAction(Types.SET_FOLLOWED_BRANDS, { payload })

export const addFollowedBrands = payload =>
createAction(Types.ADD_FOLLOWED_BRANDS, { payload })

export const removeFollowedBrands = payload =>
createAction(Types.REMOVE_FOLLOWED_BRANDS, { payload })
