import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import BrandsReducer from './reducer_brands';
import ActiveBrandReducer from './reducer_active_brand';
import FollowedBrandReducer from './reducer_followed_brands';
import SiteReducer from './reducer_site';
import CollectionReducer from './reducer_collections';
import LikedCollectionReducer from './reducer_liked_collections';
import ActiveCollectionReducer from './reducer_active_collection';

const rootReducer = combineReducers({
  site: SiteReducer,
  user: UserReducer,
  brands: BrandsReducer,
  activeBrand: ActiveBrandReducer,
  followedBrands: FollowedBrandReducer,
  collections: CollectionReducer,
  likedCollections: LikedCollectionReducer,
  activeCollection: ActiveCollectionReducer
});

export default rootReducer;
