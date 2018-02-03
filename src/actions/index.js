import Types from '../types';

const createAction = (type, params = null) => ({ type, ...params });

export const getBrands = payload =>
createAction(Types.GET_BRANDS, { payload })

export const selectBrand = payload =>
createAction(Types.BRAND_SELECTED, { payload })

export const attachUser = payload =>
createAction(Types.ATTACH_USER, { payload })
