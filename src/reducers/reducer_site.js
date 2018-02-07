export default function (state = false, action) {
  switch(action.type) {
    case 'ENTER_SITE':
      return true;
  }
  return state;
}
