import React, {useState, useEffect} from 'react'
import {Link, useParams, useNavigate, useAsyncValue} from 'react-router-dom';
import { useFetchGroup } from "../../hooks/fetch-group";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { User } from '../user/user';
import {joinGroup, leaveGroup} from "../../services/group-services";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@mui/material";
import { Comments } from "../comments/comments";
import { EventList } from "../events/event-list";
import {styled} from "@mui/material/styles";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


const MemberContainer  =  styled("div")(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '2fr 4fr 15fr',
    alignItems: 'center',
    justifyItems: 'start'
}));

const trophyColor = (trophy) => {
  switch(trophy) {
    case 'gold': return '#FFD700';
    case 'silver': return '#C0C0C0';
    case 'bronze': return '#CD7F32';
    default: return 'gray';
  }
};

function GroupDetails() {

    const { authData} = useAuth();
    const { id } = useParams();
    const [data, loading, error, refetchGroup] = useFetchGroup(id);
    const [group, setGroup] = useState(null);
    const [isGroup, setInGroup] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(data?.members){

            data.members.sort((a, b) => b.points - a.points);

            const availableTrophies = ['gold', 'silver', 'bronze'];
            let currentTrophy = 0;
            data.members.forEach((m, indx) => {
                if(indx === 0){
                    m.trophy = availableTrophies[currentTrophy];
                } else {
                    if (m.points !== data.members[indx - 1].points) {
                        currentTrophy++;

                    }
                    if (currentTrophy < availableTrophies.length) {
                        m.trophy = availableTrophies[currentTrophy];
                    }

                }
        });



            if(authData?.user){
                setInGroup(!!data.members.find( member => member.user.id === authData.user.id))
                setIsAdmin(data.members.find( member => member.user.id === authData.user.id)?.admin)
            }

        }
        setGroup(data);

    }, [data])

    const joinHere = () => {
        joinGroup({user: authData.user.id, group: group.id}).then(res => {
            console.log(res);
            refetchGroup();
        });
    };

       const leaveHere = () => {
        leaveGroup({user: authData.user.id, group: group.id}).then(res => {
            console.log(res);
            refetchGroup();
        });
    };

    const addEvent = () => {
        navigate('/event-form', {state: {group}});
    }

    if (error) return  <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

    return (
        <div>
            <Link to={'/'}><ChevronLeftIcon/></Link>
            {group &&
                <React.Fragment>
                    <h1>{group.name} {group.location}</h1>
                    <h2>{group.description} </h2>
                    {isGroup ?
                        <Button onClick={()=> leaveHere()} variant="contained" color="primary">Leave Group</Button>
                        :
                        <Button onClick={()=> joinHere()} variant="contained" color="primary">Join Group</Button>
                    }
                    {/*isAdmin && */}
                        <Button onClick={()=> addEvent()} variant="contained" color="primary">Add new Event</Button>



                    <EventList events={group.events}/>


                      <h3>Members:</h3>

                    { group.members.map(member=> {

                        return <div key={member.id}>
                            <MemberContainer>
                            <User user={member.user} />
                                <p><EmojiEventsIcon style={{ color: trophyColor(member.trophy) }} /></p>
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