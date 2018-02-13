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

export const createUser = payload =>
createAction(Types.CREATE_USER, { payload })

export const detachUser = payload =>
createAction(Types.DETACH_USER, { payload })

export const enterSite = payload =>
createAction(Types.ENTER_SITE, { payload: status })

export const getCollections = payload =>
createAction(Types.GET_COLLECTIONS, { payload })

export const setLikedCollections = payload =>
createAction(Types.SET_LIKED_COLLECTIONS, { payload })

export const addLikedCollections = payload =>
createAction(Types.ADD_LIKED_COLLECTIONS, { payload })

export const removeLikedCollections = payload =>
createAction(Types.REMOVE_LIKED_COLLECTIONS, { payload })

export const selectCollection = payload =>
createAction(Types.COLLECTION_SELECTED, { payload })

export const exitBrand = payload =>
createAction(Types.EXIT_BRAND, { payload: status })

export const getPitches = payload =>
createAction(Types.GET_PITCHES, { payload })

export const addPitch = payload =>
createAction(Types.ADD_PITCH, { payload })
