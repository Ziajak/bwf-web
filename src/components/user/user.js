import React, {useState} from 'react'
import {Avatar, makeStyles} from "@mui/material";
import PropTypes from 'prop-types';


export function User(user) {
if (!user) return null;

    return (
        <div>
            <Avatar alt="user avatar" src={"http://127.0.0.1:8000"+user.user.profile.image} />
            <h4>{user.user.username}</h4>
        </div>
    );

}

User.prototype = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            image: PropTypes.string
        }).isRequired
    }).isRequired
}
