import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import { useFetchGroup } from "../../hooks/fetch-group";
import {DateTime} from "luxon";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { styled } from "@mui/material/styles";
import { User } from '../user/user';
import {joinGroup} from "../../services/group-services";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@mui/material";

// Stylowane ikony
const StyledCalendarIcon = styled(CalendarTodayIcon)(({ theme }) => ({
  fontSize: "18px",
  marginRight: "3px",
  marginTop: "10px",
  color: theme.colors.mainAccentColor

}));

const MemberContainer  =  styled("div")(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '100px auto'
}));


const StyledAlarmIcon = styled(AccessAlarmIcon)(({ theme }) => ({
  fontSize: "18px",
  marginRight: "3px",
  marginTop: "10px",
  color: theme.colors.mainAccentColor
}));

function GroupDetails() {

    const { authData} = useAuth();
    const { id } = useParams();
    const [data, loading, error] = useFetchGroup(id);
    const [group, setGroup] = useState(null);

    useEffect(()=>{
        setGroup(data);

    }, [data])

    const joinHere = () => {
        joinGroup({user: authData.user.id, group: group.id}).then(
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
                    <Button onClick={()=> joinHere()} variant="contained" color="primary">Join Group</Button>

                    <h3>Events:</h3>

                    { group.events.map(event=> {
                        const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
                        const evtTime = DateTime.fromFormat(event.time, format)

                        return <MemberContainer>
                        <div key={event.id}>
                            <p>{event.team1} VS {event.team2}</p>
                            <p>
                                <StyledCalendarIcon/> {evtTime.toSQLDate()}
                                <StyledAlarmIcon/> {evtTime.toFormat('HH:mm')}
                            </p>
                        </div>
                            </MemberContainer>
                    })}

                      <h3>Members:</h3>

                    { group.members.map(member=> {

                        return <div key={member.id}>
                            <MemberContainer>
                            <User user={member.user} />
                            <p>{member.points} pts</p>
                            </MemberContainer>
                        </div>

                    })}
                </React.Fragment>
                }
        </div>
  );
}

export default GroupDetails;