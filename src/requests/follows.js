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
  create (brandId) {
    // params should be an object containing
    // attributes to create the question.
    // {title: 'Where are you?', body: 'Canada, US, UK, etc.'}
    const {id} = getUser()
    console.log(id);
    // debugger;
    return fetch(
      `${BASE_URL}/brands/${brandId}/follows`,
      {
        method: 'POST',
        headers: {
          'Authorization': getJwt(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ brandId })
      }
    )
    .then(res => res.json())
  }
}
