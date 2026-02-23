export async function setMemberAdmin(user_id, group_id, admin, token) {
  const res = await fetch(`http://127.0.0.1:8000/api/members/set_admin/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    body: JSON.stringify({
      user_id: user_id,
      group_id: group_id,
      admin
    })
  })

  const data = await res.json();

  if (res.status === 401) {
  throw {
    type: 'unauthorized',
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