import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import { useFetchGroup } from "../../hooks/fetch-group";

import { User } from '../user/user';
import {joinGroup, leaveGroup} from "../../services/group-services";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@mui/material";
import { Comments } from "../comments/comments";
import { EventList } from "../events/event-list";
import {styled} from "@mui/material/styles";


const MemberContainer  =  styled("div")(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '100px auto'
}));

function GroupDetails() {

    const { authData} = useAuth();
    const { id } = useParams();
    const [data, loading, error] = useFetchGroup(id);
    const [group, setGroup] = useState(null);
    const [isGroup, setInGroup] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(()=>{
        if(data?.members){
            if(authData?.user){
                setInGroup(!!data.members.find( member => member.user.id === authData.user.id))
                setIsAdmin(data.members.find( member => member.user.id === authData.user.id)?.admin)
            }

        }
        setGroup(data);

    }, [data])

    const joinHere = () => {
        joinGroup({user: authData.user.id, group: group.id}).then(
            res => {console.log(res)}
        )
    }

       const leaveHere = () => {
        leaveGroup({user: authData.user.id, group: group.id}).then(
            res => {console.log(res)}
        )
    }

    if (error) return  <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

    return (
        <div>
            <Link to={'/'}>Back</Link>
            {group &&
                <React.Fragment>
                    <h1>{group.name} {group.location}</h1>
                    <h2>{group.description} </h2>
                    {isGroup ?
                        <Button onClick={()=> leaveHere()} variant="contained" color="primary">Leave Group</Button>
                        :
                        <Button onClick={()=> joinHere()} variant="contained" color="primary">Join Group</Button>
                    }

                    <EventList events={group.events}/>


                      <h3>Members:</h3>

                    { group.members.map(member=> {

                        return <div key={member.id}>
                            <MemberContainer>
                            <User user={member.user} />
                            <p>{member.points} pts</p>
                            </MemberContainer>
                        </div>

                    })}

                    <Comments group={group}/>
                </React.Fragment>
                }
        </div>
  );
}

export default GroupDetails;