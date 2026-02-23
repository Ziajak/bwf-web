import {status} from "../utils";
export function getGroups(token) {
return fetch(`http://127.0.0.1:8000/api/groups/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`

        }}).then(res => {
    if (res.status === 401) {
      throw { type: 'unauthorized' };
    }
    if (!res.ok)
    throw { type: 'server' };
    else
        return res.json();
  }
  );
}

export async function createGroup(token, data_group) {
    const response = await fetch(`http://127.0.0.1:8000/api/groups/`, {
    method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    body: JSON.stringify(data_group)
        }
        );

    const data = await response.json();

      if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;

}

export async function deleteGroup(token, groupId) {
  const response = await fetch(`http://127.0.0.1:8000/api/groups/${groupId}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${token}`
    }
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || 'Can not delete group');
  }

  return { message: 'Group deleted' };
}

export function getGroup(id, token) {
    console.log('TOKEN:', token);
return fetch(`http://127.0.0.1:8000/api/groups/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`

        }})
    .then(status).catch(e => {console.log(e)})
}

export function joinGroup(data) {
return fetch(`http://127.0.0.1:8000/api/members/join/`, {
    method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)
        }).then(status).catch(e => {console.log(e)})
}

export function leaveGroup(data) {
return fetch(`http://127.0.0.1:8000/api/members/leave/`, {
    method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)
        }).then(status).catch(e => {console.log(e)})
}

export function postComment(token, description, group, user) {
return fetch(`http://127.0.0.1:8000/api/comments/`, {
    method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`

        },
        body: JSON.stringify({description, group, user})
        }).then(status).catch(e => {console.log(e)})
}