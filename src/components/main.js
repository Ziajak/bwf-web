import React from 'react'
import GroupList from "./group-list";
import { Routes, Route } from 'react-router-dom';
import GroupDetails from "./group-details";
import { useAuth } from "../hooks/useAuth";
import Register from "./register";

function Main() {

    const { authData } = useAuth();

    return (
    <div className="main">
        { authData && authData.user.username}
        <Routes>
            <Route path="/" element={<GroupList/>} />
            <Route path="/details/:id" element={<GroupDetails/>} />
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </div>
  );
}

export default Main;
