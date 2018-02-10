export default function (state = null, action) {
  switch(action.type) {
    case 'COLLECTION_SELECTED':
      return action.payload
  }
  return state;
}
