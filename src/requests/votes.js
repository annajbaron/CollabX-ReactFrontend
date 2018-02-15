import {BASE_URL} from './config_request';
const jwtDecode = require('jwt-decode');

function getJwt () {
  return `JWT ${localStorage.getItem('jwt')}`;
}

function getUser () {
  return jwtDecode(`${localStorage.getItem('jwt')}`)
}

// HTTP REQUESTS
export const Vote = {
  all () {
    return fetch(
      `${BASE_URL}/votes`,
      {
        headers: {
          'Authorization': getJwt()
        }
      }
    )
      .then(res => res.json())
  },
  create (pitch, params) {
    const {id} = getUser()
    return fetch(
      `${BASE_URL}/pitches/${pitch.id}/votes`,
      {
        method: 'POST',
        headers: {
          'Authorization': getJwt(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, params })
      }
    )
    .then(res => res.json())
  },
  update (voteId, params) {
    const {id} = getUser()
    return fetch(
      `${BASE_URL}/votes/${voteId.id}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': getJwt(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, params })
      }
    )
    .then(res => res.json())
  },
  destroy (voteId) {
    return fetch(
      `${BASE_URL}/votes/${voteId.id}`,
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
