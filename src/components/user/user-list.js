import React, { useEffect, useState, useRef } from 'react';
import { getUsers } from "../../services/user-services";
import { setMemberAdmin } from "../../services/member-services";
import { toast } from 'react-toastify';
import { useAuth } from "../../hooks/useAuth";
import {Link, useNavigate} from 'react-router-dom';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {styled} from "@mui/material/styles";

const Box = styled("div")({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'flex-start'
});

const Table = styled('table')({
    width: 'max-content',
    maxWidth: '100%',
    borderCollapse: 'collapse'
});

const Th = styled('th')({
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
});

const Td = styled('td')({
  border: '1px solid #ccc',
  padding: '8px',
  wordBreak: 'break-word',
});

function UserList() {
  const { authData } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const errorShown = useRef(false);

  useEffect(() => {
      if (!authData?.token) {
         if (!errorShown.current) {
            toast.error('You must be logged in');
            errorShown.current = true;
    }
      navigate('/');
      return;
    }

    getUsers(authData.token)
      .then(data => {
        setUsers(
          data.map(user => ({
            ...user,
            members: user.members.map(m => ({
              ...m,
              originalAdmin: m.admin
            }))
          }))
        );
        setLoading(false);
      })
         .catch(err => {
      if (!errorShown.current) {
        if (err.unauthorized) {
          toast.error(err.message || 'Unauthorized');
        } else if (err.forbidden) {
          toast.error(err.message || 'Forbidden');
        } else {
          toast.error('Server error');
        }
        errorShown.current = true;
      }
      setLoading(false);
      navigate('/');
    });
}, [authData, navigate]);

  const toggleAdmin = (userId, groupId) => {
    setUsers(prev =>
      prev.map(user =>
        user.id !== userId
          ? user
          : {
              ...user,
              members: user.members.map(m =>
                m.group_id === groupId
                  ? { ...m, admin: !m.admin }
                  : m
              )
            }
      )
    );
  };

  const handleUpdate = (userId, groupId, admin) => {
    setMemberAdmin(userId, groupId, admin, authData.token)
      .then(() => {
        setUsers(prev =>
          prev.map(user => ({
            ...user,
            members: user.members.map(m =>
              m.group_id === groupId
                ? { ...m, originalAdmin: admin }
                : m
            )
          }))
        );
        toast.success('The changes was written');
      })
      .catch(err => {
        if (err.unauthorized) {
          toast.error(err.message || 'Unauthorized');
        } else if (err.forbidden) {
          toast.error(err.message || 'Forbidden');
        } else {
          toast.error('Server error');
        }
    });
  };

  if (loading) return <h3>Loading...</h3>;

  return ( <Box>
  <Link to="/"><ChevronLeftIcon /></Link>

  <Table>
    <thead>
      <tr>
        <Th>Username</Th>
        <Th>Email</Th>
        <Th>Group</Th>
        <Th align="center">Admin</Th>
        <Th>Action</Th>
      </tr>
    </thead>

    <tbody>
      {users.map(user =>
        user.members.length > 0 ? (
          user.members.map(m => (
            <tr key={`${user.id}-${m.group_id}`}>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>
              <Td>{m.group_name}</Td>

              <Td align="center">
                <input
                  type="checkbox"
                  checked={m.admin}
                  onChange={() => toggleAdmin(user.id, m.group_id)}
                />
              </Td>

              <Td>
                <button
                  disabled={m.admin === m.originalAdmin}
                  onClick={() =>
                    handleUpdate(user.id, m.group_id, m.admin)
                  }
                >
                  Update
                </button>
              </Td>
            </tr>
          ))
        ) : (
          <tr key={user.id}>
            <Td>{user.username}</Td>
            <Td>{user.email}</Td>
            <Td colSpan={3} align="center">
              — brak grup —
            </Td>
          </tr>
        )
      )}
    </tbody>
  </Table>
</Box>
  );
}

export default UserList;
