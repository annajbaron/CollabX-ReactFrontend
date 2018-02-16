export default function (state = null, action) {
  switch(action.type) {
    case 'COLLECTION_SELECTED':
      return action.payload;
      case 'EXIT_COLLECTION':
        return null;
  }
  return state;
}
