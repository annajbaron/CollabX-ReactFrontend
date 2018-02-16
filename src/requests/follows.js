import {BASE_URL} from './config_request';
const jwtDecode = require('jwt-decode');

function getJwt () {
  return `JWT ${localStorage.getItem('jwt')}`;
}

function getUser () {
  return jwtDecode(`${localStorage.getItem('jwt')}`)
}

// HTTP REQUESTS
export const Follow = {
  all () {
    return fetch(
      `${BASE_URL}/follows`,
      {
        headers: {
          'Authorization': getJwt()
        }
      }
    )
      .then(res => res.json())
  },
  create (brand) {
    const {id} = getUser()
    return fetch(
      `${BASE_URL}/brands/${brand.id}/follows`,
      {
        method: 'POST',
        headers: {
          'Authorization': getJwt(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      }
    )
    .then(res => res.json())
  },
  destroy (followId) {
    return fetch(
      `${BASE_URL}/follows/${followId.id}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': getJwt(),
          'Content-Type': 'application/json'
        }
      }
    )
    .then(res => res)
  }

}
