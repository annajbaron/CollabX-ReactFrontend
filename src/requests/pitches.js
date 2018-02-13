import {BASE_URL} from './config_request';
const jwtDecode = require('jwt-decode');

function getJwt () {
  return `JWT ${localStorage.getItem('jwt')}`;
}

// HTTP REQUESTS
export const Pitch = {
  all () {
    return fetch(
      `${BASE_URL}/pitches`,
      {
        headers: {
          'Authorization': getJwt()
        }
      }
    )
      .then(res => res.json())
  },
  get (id) {
    return fetch(
      `${BASE_URL}/pitches/${id}`,
      {
        headers: {
          'Authorization': getJwt()
        }
      }
    )
      .then(res => res.json())
  }

}
