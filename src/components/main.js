import React from 'react'
import GroupList from "./group-list";
import { Routes, Route } from 'react-router-dom';

function Main() {


    return (
    <div className="main">
        <Routes>
            <Route path="/" element={<GroupList/>} />
            <Route path="/details" element={<h1>Details</h1>} />
        </Routes>
    </div>
  );
}

export default Main;
