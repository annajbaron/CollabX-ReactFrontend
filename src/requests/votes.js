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
  create (params) {
    const {id} = getUser()
    return fetch(
      `${BASE_URL}/pitches/${params.pitch_id}/votes`,
      {
        method: 'POST',
        headers: {
          'Authorization': getJwt(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: id, pitch_id: params.pitch_id, is_up: params.is_up})
      }
    )
    .then(res => res.json())
  },
  update (params) {
    const {id} = getUser()
    return fetch(
      `${BASE_URL}/votes/${params.id}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': getJwt(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: id, id: params.id, is_up: params.is_up })
      }
    )
    .then(res => res.json())
  },
  destroy (voteId) {
    return fetch(
      `${BASE_URL}/votes/${voteId}`,
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
