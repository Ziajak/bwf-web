import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createGroup, deleteGroup, getGroups } from "../../services/group-services";
import { useAuth } from "../../hooks/useAuth";
import { toast } from 'react-toastify';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

function GroupList() {
  const { authData } = useAuth();
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);

  useEffect(() => {
    if (!authData?.token) {
      setGroups([]);
      setLoading(false);
      navigate('/');
      return;
    }

    getGroups(authData.token)
      .then(data => {
        setGroups(data);
        setLoading(false);
      })
      .catch(err => {
        if (err?.type === 'unauthorized') {
          toast.error('Session expired. Please log in again.');
          navigate('/login');
        } else {
          toast.error('Server error');
        }
        setLoading(false);
      });
  }, [authData?.token, navigate]);

  const handleDelete = async (groupId) => {
    try {
      await deleteGroup(authData.token, groupId);
      setGroups(prev => prev.filter(g => g.id !== groupId));
      toast.success('Group removed');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const openDeleteDialog = (groupId) => {
    setGroupToDelete(groupId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (groupToDelete) handleDelete(groupToDelete);
    setDeleteDialogOpen(false);
    setGroupToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setGroupToDelete(null);
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div style={{ maxWidth: '500px' }}>
      <h1>Groups:</h1>
      {groups.length > 0 ? (
        groups.map(group => (
          <div
            key={group.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 15px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              marginBottom: '10px'
            }}
          >
            <Link to={`/details/${group.id}`} style={{ flex: 1 }}>
              <strong>{group.name}</strong> – {group.location}
            </Link>


              <Button
                variant="outlined"
                color="error"
                onClick={() => openDeleteDialog(group.id)}
              >
                Remove
              </Button>

          </div>
        ))
      ) : (
        <p>No groups available. Please log in</p>
      )}

      <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
        <DialogTitle>Are you sure you want to delete this group?</DialogTitle>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default GroupList;
