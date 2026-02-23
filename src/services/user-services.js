import {status} from "../utils";

export async function auth(credentials) {
const response = await fetch(
        'http://127.0.0.1:8000/api/authenticate/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Login failed');
    }

    return data;
}


export function register(userData) {
    return fetch(`http://127.0.0.1:8000/api/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(status).catch(e => {console.log(e)})
}

export async function getUsers(token) {
  const res = await fetch(`http://127.0.0.1:8000/api/users/`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const data = await res.json();

  if (res.status === 401) {
  throw {
    unauthorized: true,
    message: 'Session expired. Please log in again.',
  };
}

if (res.status === 403) {
  throw {
    forbidden: true,
    message: data.detail
  };
}

  if (!res.ok) {
    throw {
      message: 'Server error',
    };
  }

  return data;
}


export function uploadAvatr(profileId, data) {
    return fetch(`http://127.0.0.1:8000/api/profile/${profileId}/`, {
        method: 'PUT',
        body: data
    }).then(status).catch(e => {console.log(e)})
}

export function changePass(userData, userId, token) {
    return fetch(`http://127.0.0.1:8000/api/users/${userId}/change_pass/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(userData)
    }).then(status).catch(e => {console.log(e)})
}