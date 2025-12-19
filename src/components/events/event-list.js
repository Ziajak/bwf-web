import React from "react";
import {DateTime} from "luxon";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { styled } from "@mui/material/styles";
import {useNavigate} from "react-router-dom";

// Stylowane ikony
const StyledCalendarIcon = styled(CalendarTodayIcon)(({ theme }) => ({
  fontSize: "18px",
  marginRight: "3px",
  marginTop: "10px",
  color: theme.colors.mainAccentColor

}));

const MemberContainer  =  styled("div")(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1000px auto'
}));


const StyledAlarmIcon = styled(AccessAlarmIcon)(({ theme }) => ({
  fontSize: "18px",
  marginRight: "3px",
  marginTop: "10px",
  color: theme.colors.mainAccentColor
}));

export function EventList({events}){

    const navigate = useNavigate();
    const openEvent = evenId =>{
        navigate(`/event/${evenId}`)

    }

    return (
        <React.Fragment>
                <h3>Events:</h3>

                { events && events.map(event=> {
                    const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
                    const evtTime = DateTime.fromFormat(event.time, format)

                    return <MemberContainer>
                    <div key={event.id} onClick={()=> openEvent(event.id)}>
                        <p>{event.team1} VS {event.team2}:

                            <StyledCalendarIcon/> {evtTime.toSQLDate()}
                            <StyledAlarmIcon/> {evtTime.toFormat('HH:mm')}
                        </p>
                    </div>
                        </MemberContainer>
                })}

        </React.Fragment>

    )
}