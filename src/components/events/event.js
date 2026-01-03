import React, {useEffect, useState} from "react";
import {DateTime} from "luxon";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { styled } from "@mui/material/styles";
import { useParams} from "react-router-dom";
import {useFetchEvent} from "../../hooks/fetch-event";
import {useAuth} from "../../hooks/useAuth";
import {User} from "../user/user";

// Stylowane ikony
const StyledCalendarIcon = styled(CalendarTodayIcon)(({ theme }) => ({
  fontSize: "18px",
  marginRight: "3px",
  marginTop: "10px",
  color: theme.colors.mainAccentColor

}));

const Bets  =  styled("div")(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    margin: '5px 0 0 0'
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
    const [event, loading, error] = useFetchEvent(authData.token, id);

    const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
    const evtTime = event?.time ? DateTime.fromFormat(event.time, format)
    : null;


    if (error) return  <h1>Error</h1>
    if (loading || !event)  return <h1>Loading...</h1>



    return (
        <React.Fragment>
            <h3>{event.team1} VS {event.team2}</h3>
            {event.score1 >=0 && event.score2  >=0 && <h2>{event.score1} : {event.score2}</h2>}

                <h2>
                    <StyledCalendarIcon/> {evtTime.toSQLDate()}
                    <StyledAlarmIcon/> {evtTime.toFormat('HH:mm')}
                </h2>
            <hr/>
            <br/>
            {event && event.bets && event.bets.map(bet => {
                return <div key={bet.id}>
                    <Bets>
                    <User user={bet.user}/>
                        <h4>{bet.score1} : {bet.score2}</h4>
                        <h4>PTS</h4>
                    </Bets>
                    </div>

            })}
        </React.Fragment>

    )
}