export default function (state = null, action) {
  switch(action.type) {
    case 'GET_COLLECTIONS':
      return action.payload;
  }
  return state;
}
