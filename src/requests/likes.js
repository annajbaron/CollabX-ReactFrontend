import {BASE_URL} from './config_request';
const jwtDecode = require('jwt-decode');

function getJwt () {
  return `JWT ${localStorage.getItem('jwt')}`;
}

function getUser () {
  return jwtDecode(`${localStorage.getItem('jwt')}`)
}

// HTTP REQUESTS
export const Like = {
  all () {
    return fetch(
      `${BASE_URL}/likes`,
      {
        headers: {
          'Authorization': getJwt()
        }
      }
    )
      .then(res => res.json())
  },
  create (collection) {
    const {id} = getUser()
    return fetch(
      `${BASE_URL}/collections/${collection.id}/likes`,
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
  destroy (likeId) {
    return fetch(
      `${BASE_URL}/likes/${likeId.id}`,
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
