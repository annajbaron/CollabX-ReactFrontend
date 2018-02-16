import {BASE_URL} from './config_request';

export const User = {
  create (params) {
    return fetch(
      `${BASE_URL}/users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
    )
    .then(res => res.json());
  }
}
