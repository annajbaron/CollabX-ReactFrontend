export default function (state = null, action) {
  switch(action.type) {
    case 'ATTACH_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'CREATE_USER':
      return {
        ...state,
        user: action.payload
      };
  }
  return state;
}
