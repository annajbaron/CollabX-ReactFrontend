export default function (state = [], action) {
  switch(action.type) {
    case 'GET_PITCHES':
      return action.payload;
  }
  return state;
}
