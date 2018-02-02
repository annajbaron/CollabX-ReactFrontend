export default function (state = null, action) {
  switch(action.type) {
    case 'GET_BRANDS':
      return {
        ...state,
        brands: action.payload
      }
  }
  return state;
}
