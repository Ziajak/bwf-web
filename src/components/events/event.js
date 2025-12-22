import React, {useEffect, useState} from "react";
import {DateTime} from "luxon";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { styled } from "@mui/material/styles";
import { useParams} from "react-router-dom";
import {useFetchEvent} from "../../hooks/fetch-event";
import {useAuth} from "../../hooks/useAuth";

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

export function Event(){

    const {authData} = useAuth();
    const { id } = useParams();
    const [data, loading, error] = useFetchEvent(authData.token, id);
    const [event, setEvent] = useState(null);

        useEffect(()=>{
        if(data){
             setEvent(data);
        }
    }, [data])
    return (
        <React.Fragment>
                <h3>Event info here:</h3>
            {event && (
                <>
                    {event.team1} vs. {event.team2}
                </>
            )}





        </React.Fragment>

    )
}