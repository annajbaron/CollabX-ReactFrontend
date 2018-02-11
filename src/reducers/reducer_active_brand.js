export default function (state = null, action) {
  switch(action.type) {
    case 'BRAND_SELECTED':
      return action.payload;
    case 'EXIT_BRAND':
      return null;
  }
  return state;
}
