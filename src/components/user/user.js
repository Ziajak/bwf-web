import React, {useState} from 'react'
import {Avatar, makeStyles} from "@mui/material";



function User(user) {


    return (
        <div>
            <Avatar alt="user avatar" src={"http://127.0.0.1:8000"+user.user.profile.image} />
            <h4>{user.user.username}</h4>
        </div>
    );

}

export default User;
