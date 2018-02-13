export default function (state = [], action) {
  switch(action.type) {
    case 'GET_PITCHES':
      return action.payload;
    case 'ADD_PITCH':
      return state.concat([action.payload]);
  }
  return state;
}
