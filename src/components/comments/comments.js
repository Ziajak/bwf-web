import React, {useEffect, useState} from 'react'
import { Comment } from './comment'
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {useAuth} from "../../hooks/useAuth";
import {postComment} from "../../services/group-services";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export function Comments({group}) {

    const [isMember, setInMember] = useState(false);

    const {authData} = useAuth();

    const [ newComment, setNewComment] = useState('');
    const getUser = userId => {
        return group.members.find(member => member.user.id === userId).user
    }

    const sendComment = () => {
        postComment(authData.token, newComment, group.id, authData.user.id )
            .then( resp => {
                setNewComment('');
                // group.comments.unshift(resp);
            })

    }

    useEffect(() => {
        if(group?.members){
            if(authData?.user){
                setInMember(!!group.members.find(m => m.user.id === authData.user.id))
            }
        }
        }, [group, authData])

    return (
    <div>
        {isMember ? (
            <>
        <hr/>


        <TextField
            label="New comment"
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            value={newComment}
            onChange={ evt => setNewComment(evt.target.value)}
        />
        <Button onClick={ () => sendComment() } disabled={!newComment}
        variant='contained' color='primary'
        >Send comment</Button>
        <br/><br/>

        </>
        ) : (
<div> <hr/>
             <Paper
    elevation={3}
    sx={{
      display: 'inline-block',
    padding: 2,
    marginBottom: 2,
    backgroundColor: '#DADADA',
    }}
  >
    <Typography variant="h6" color="error">
      Join the group to send a comment
    </Typography>
  </Paper>
</div>

            )

        }
        <h1>Comments:</h1>
        {group.comments.map( comment => {
            return <Comment comment={comment} user={getUser(comment.user)}/>
        })}

    </div>
  );
}


