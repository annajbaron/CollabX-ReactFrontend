export default function (state = [], action) {
  switch(action.type) {
    case 'ADD_VOTED_PITCHES':
      return state.concat([action.payload]);
    case 'SET_VOTED_PITCHES':
      return action.payload;
    case 'REMOVE_VOTED_PITCHES':
      return state.filter(like => (like.id !== action.payload.id));
  }
  return state;
}
