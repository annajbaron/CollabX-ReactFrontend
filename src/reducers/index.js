import { combineReducers } from 'redux';
import BrandsReducer from './reducer_brands';
import ActiveBrandReducer from './reducer_active_brand';

const rootReducer = combineReducers({
  brands: BrandsReducer,
  activeBrand: ActiveBrandReducer
});

export default rootReducer;
