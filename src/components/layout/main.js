import React from 'react'
import GroupList from "../group/group-list";
import { Routes, Route } from 'react-router-dom';
import GroupDetails from "../group/group-details";
import { useAuth } from "../../hooks/useAuth";
import Register from "../user/register";
import Account from "../user/account";
import User from "../user/user";
import { Event } from "../events/event"
import {EventForm} from "../events/event-form";

function Main() {

    // const { authData } = useAuth();

    return (
    <div className="main">
        {/*{ authData && authData.user.username}*/}
        <Routes>
            <Route path="/" element={<GroupList/>} />
            <Route path="/details/:id" element={<GroupDetails/>} />
            <Route path="/event/:id" element={<Event/>} />
            <Route path="/event-form/" element={<EventForm/>} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/account" element={<Account/>}/>
        </Routes>
    </div>
  );
}

export default Main;
