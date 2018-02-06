import {BASE_URL} from './config_request';

export const Token = {
  create (params) {
    return fetch(
      `${BASE_URL}/tokens`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
    )
    .then(res => {
      if (res.status === 200) {
        console.log('successful login')
        return res.json();
      } else {
        console.log('wrong login')
        return {error: 'Unauthorized'};
      }
    });
  }
};
