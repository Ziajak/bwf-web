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
    const [evtTime, setEvTime] = useState(null);

    useEffect(()=> {
        if (!data) return;

        setEvent(data);
        const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
        setEvTime(DateTime.fromFormat(data.time, format))


    }, [data])

    if (error) return  <h1>Error</h1>
    if (loading || !event )  return <h1>Loading...</h1>



    return (
        <React.Fragment>
            <h3>{event.team1} VS {event.team2}</h3>
                <h2>
                    <StyledCalendarIcon/> {evtTime.toSQLDate()}
                    <StyledAlarmIcon/> {evtTime.toFormat('HH:mm')}
                </h2>
        </React.Fragment>

    )
}