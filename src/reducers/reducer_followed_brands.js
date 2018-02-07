export default function (state = [], action) {
  switch(action.type) {
    case 'ADD_FOLLOWED_BRANDS':
      return state.concat([action.payload]);
    case 'SET_FOLLOWED_BRANDS':
      return action.payload;
    case 'REMOVE_FOLLOWED_BRANDS': {
      return state.filter(follow => (follow.id !== action.payload.id));
    }
  }
  return state;
}
