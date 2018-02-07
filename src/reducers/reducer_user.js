export default function (state = null, action) {
  switch(action.type) {
    case 'ATTACH_USER':
      return action.payload;
    case 'CREATE_USER':
      return action.payload;
    case 'DETACH_USER':
      return null;
  }
  return state;
}
