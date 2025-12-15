import React from 'react'
import {User} from '../user/user'
import {styled} from "@mui/material/styles";
import {Typography} from "@mui/material";

const MyBox = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 3fr'

}));

const DialogBox = styled('div')(({ theme }) => ({
    marginBottom: '50px'

}));

const DialogBody = styled('div')(({ theme }) => ({
    position: 'relative',
    padding: '5px',
    backgroundColor: theme.colors.bgLighterColor,
    borderRadius: '5px',
    border: `5px solid ${theme.colors.bgLighterColor}`

}));

const Tip = styled('div')(({ theme }) => ({
    width: '0',
    height: '0',
    position: 'absolute',
    background: 'transparent',
    border: `10px solid ${theme.colors.bgLighterColor}`,
    top: '5px',
    left: '-25px',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent'

}));

const BodyMesagge = styled('div')(({ theme }) => ({
    color: theme.colors.bgColor

}));

const Time = styled('div')(({ theme }) => ({
    float: 'right'

}));

export function Comment({comment, user}) {


    return (

        <MyBox>
            <User user={user}/>

            <DialogBox>
                <DialogBody>

                    <Tip><span>&nbsp;</span></Tip>
                        <BodyMesagge>
                        <span>{comment.description}</span>
                        </BodyMesagge>
                </DialogBody>
                <Typography>
                    <Time>
                    {comment.time.split('T')[0]} &nbsp;{comment.time.split('T')[1].substring(0,5)}
                    </Time>
                </Typography>
            </DialogBox>
        </MyBox>

  );
}


