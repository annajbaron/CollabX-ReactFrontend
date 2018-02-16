export default function (state = [], action) {
  switch(action.type) {
    case 'ADD_LIKED_COLLECTIONS':
      return state.concat([action.payload]);
    case 'SET_LIKED_COLLECTIONS':
      return action.payload;
    case 'REMOVE_LIKED_COLLECTIONS':
      return state.filter(like => (like.id !== action.payload.id));
  }
  return state;
}
