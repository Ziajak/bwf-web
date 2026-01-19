import React, {useEffect, useState} from "react";
import {DateTime} from "luxon";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { styled } from "@mui/material/styles";
import { Link, useParams} from "react-router-dom";
import {useFetchEvent} from "../../hooks/fetch-event";
import {useAuth} from "../../hooks/useAuth";
import {User} from "../user/user";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {placeBet, setResults} from "../../services/event-services";
import { toast } from 'react-toastify';
import {Navigate} from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


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
    const [event, loading, error, refetchEvent] = useFetchEvent(authData?.token, id);
    const[score1, setScore1] = useState('');
    const[score2, setScore2] = useState('');
    const [isFuture, setIsFuture] = useState(null);
    const[timeDiff, setTimeDiff] = useState();

    const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";

    const evtTime = event?.time
      ? DateTime.fromFormat(event.time, format)
      : null;

    useEffect(() => {
        if(evtTime){
        setIsFuture(evtTime > DateTime.now());
        setTimeDiff(evtTime.toRelative());
        }

        }, [evtTime]);



    useEffect(() => {
    if (!authData?.token) {
        toast.error("You must log in", { toastId: "auth-error" });

    }
    }, [authData?.token]);

    if (!authData?.token) {
        return <Navigate to="/" replace />;
    }

    const sendBet = async () => {
        const bet = await placeBet(authData.token, {score1, score2, 'event': event.id});
        refetchEvent();
        if(bet){
            if(bet.new){
                event.bets.push(bet.result)
            } else {
                const myBetIndex = event.bets.findIndex(el => el.user.id === bet.result.user.id)
                event.bets[myBetIndex] = bet.result
            }
            toast.success(bet.message);

            setScore1('');
            setScore2('');
        }
    }

    const setScores = async () => {
        try {
        const eventData = await setResults(authData.token, {
          score1,
          score2,
          event: event.id,
        });

        refetchEvent();
        toast.success("Scores have been set");

        setScore1('');
        setScore2('');
      }
      catch (err) {
        toast.error(err.message);
      }
     };


    if (error) return  <h1>Error</h1>
    if (loading || !event)  return <h1>Loading...</h1>



    return (
        <React.Fragment>
            <Link to={`/details/${event.group}`}><ChevronLeftIcon/></Link>
            <h3>{event.team1} VS {event.team2}</h3>
            {event.score1 >=0 && event.score2  >=0 && <h2>{event.score1} : {event.score2}</h2>}

                <h2>
                    <StyledCalendarIcon/> {evtTime.toSQLDate()}
                    <StyledAlarmIcon/> {evtTime.toFormat('HH:mm')}
                </h2>
            <h2>{timeDiff}</h2>
            <hr/>
            <br/>
            {event &&
                event.bets
                && event.bets.map(bet => {
                    return <div key={bet.id}>
                    <Bets>
                    <User user={bet.user}/>
                        <h4>{bet.score1} : {bet.score2}</h4>
                        <h4>PTS</h4>
                    </Bets>
                    <hr/>
                        </div>
                    })}

                    <br/>
            <TextField label="Score 1" type="number" value={score1}
                onChange={ e => setScore1(e.target.value)}/>
                    :
                    <TextField label="Score 2" type="number" value={score2}
                onChange={ e => setScore2(e.target.value)}/>

            <div>
                <br/>
            { isFuture ?

                    <Button variant="contained" color="primary"
                    onClick={() => sendBet()} disabled={score1 === '' || score2 === ''}>Place bet</Button>
                :
                <Button variant="contained" color="primary"
                    onClick={() => setScores()} disabled={score1 === '' || score2 === ''}>Set Score</Button>

                 }
</div>
        </React.Fragment>

    )
}