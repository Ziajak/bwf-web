import React, {useState} from 'react'
import { Button } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { auth } from '../services/user-services';
import { useAuth } from "../hooks/useAuth";
import { Link } from 'react-router-dom';

function Sidebar() {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const { authData, setAuth} = useAuth();

    const  handleSubmit = async e => {
        e.preventDefault();
        // console.log(username, password);
        const data = await auth({username, password})
        //setAuth(data);
        //localStorage.setItem('btw-user', JSON.stringify(data));
        setAuth(data);

    }
    const logout = () => {
        setAuth(null);
    }

    return (
    <div className="sidebar">
        { !authData ?
            <div>
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
            <br/>
            <Link to={'/register'}>Register here if you don't have an account yet</Link>
            </div>
       :
            <div>
                <p>{authData.user.username}</p>
                <Button variant="contained" color="primary" onClick={()=> logout()}>Logout</Button>
            </div>
        }
    </div>
  );
}

export default Sidebar;
