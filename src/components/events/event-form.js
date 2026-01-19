import {Link, useLocation} from "react-router-dom";
import { CssTextField} from "../layout/elements";
import {Button} from "@mui/material";
import React, {useState} from "react";
import {DateTime} from "luxon";
import { createEvent} from "../../services/event-services";
import {useAuth} from "../../hooks/useAuth";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export function EventForm(){

    const { state } = useLocation();
    const navigate = useNavigate();
    const group = state?.group;
    const { authData } = useAuth()
    const [team1, setTeam1] = useState();
    const [team2, setTeam2] = useState();
    const [time, setTime] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const format = "yyyy-MM-dd'T'HH:mm";
        const utcTime = DateTime.fromFormat(time, format, {zone: 'utc'}).toFormat(format);
        const dataToSend = {team1, team2, 'time': utcTime, 'group': group.id};
        const eventData = await createEvent(authData.token, dataToSend );
        if(eventData){
            toast.success('Event created')
            navigate(`/details/`+group.id)
        } else {
            toast.error('Error creating event')
        }
        console.log(team1, team2, utcTime);
    }

    return (
        <div>
        <Link to={`/details/${group.id}`}><ChevronLeftIcon/></Link>
        <h1>New Event for group {group.id}</h1>
            <form onSubmit={handleSubmit}>
                <CssTextField label="Team 1" onChange={e=> setTeam1(e.target.value)}/>
                <CssTextField label="Team 2" onChange={e=> setTeam2(e.target.value)}/>
                <br/>
                <br/>
                <CssTextField
                    label="Date and time of event"
                    type="datetime-local"
                    InputLabelProps={{
                    shrink: true,

                    }}
                    onChange={e=> setTime(e.target.value)}/>
                <br/>
                <br/>
                <Button variant="contained" color="primary" type={"submit"}>Create Event</Button>

            </form>

        </div>
    )
}