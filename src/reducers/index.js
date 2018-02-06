import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import BrandsReducer from './reducer_brands';
import ActiveBrandReducer from './reducer_active_brand';
import FollowedBrandReducer from './reducer_followed_brands';

const rootReducer = combineReducers({
  user: UserReducer,
  brands: BrandsReducer,
  activeBrand: ActiveBrandReducer,
  followedBrands: FollowedBrandReducer
});

export default rootReducer;
