import React, {useState} from 'react'
import { Button } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { auth } from '../services/user-services';
import { useAuth } from "../hooks/useAuth";

function Sidebar() {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const { authData, setAuthData} = useAuth();

    const  handleSubmit = async e => {
        e.preventDefault();
        // console.log(username, password);
        const data = await auth({username, password})
        setAuthData(data);

    }

    return (
    <div className="sidebar">
        { authData && <p>{ authData }</p>}
        <form onSubmit={handleSubmit}>
         <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AccountCircle sx={{ mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Username" variant="standard"
                onChange={ e => setUsername(e.target.value)}
            />
         </Box>
         <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <KeyIcon sx={{ mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Password" variant="standard" type="password"
                onChange={ e => setPassword(e.target.value)}
            />
         </Box>


         <Button variant="contained" color="primary" type="submit">
          Login
         </Button>
        </form>

    </div>
  );
}

export default Sidebar;
