export default function (state = null, action) {
  switch(action.type) {
    case 'GET_BRANDS':
      return action.payload;
  }
  return state;
}
