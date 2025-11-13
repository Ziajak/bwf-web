import React, {useState} from 'react'
import { useAuth } from "../../hooks/useAuth";
import {Link, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from '@mui/icons-material/Email';
import TextField from "@mui/material/TextField";
import KeyIcon from "@mui/icons-material/Key";
import {Button} from "@mui/material";
import {register} from "../../services/user-services";
import {auth} from "../../services/user-services";
function Register() {

    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');

    const passMatch = () => {
        return password === password2;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if(passMatch()){
            const regData = await register({username, email, password, profile: {image: null}})
            if(regData){
                const data = await auth({username, password});
                setAuth(data);
                navigate('/account');

            }
        } else {
            console.log('pass dont match')
        }

    }


        return (
            <div>
                <Link to={'/'}>Back</Link>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <AccountCircle sx={{mr: 1, my: 0.5}}/>
                        <TextField id="input-with-sx" label="Username" variant="standard"
                                   onChange={e => setUsername(e.target.value)}
                        />
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <KeyIcon sx={{mr: 1, my: 0.5}}/>
                        <TextField id="input-with-sx" label="Password" variant="standard" type="password"
                                   onChange={e => setPassword(e.target.value)}
                        />
                    </Box>
                     <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <KeyIcon sx={{mr: 1, my: 0.5}}/>
                        <TextField id="input-with-sx" label="Repeat password" variant="standard" type="password"
                                   onChange={e => setPassword2(e.target.value)}
                        />
                    </Box>
                       <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <EmailIcon sx={{mr: 1, my: 0.5}}/>
                        <TextField id="input-with-sx" label="Email" variant="standard"
                                   onChange={e => setEmail(e.target.value)}
                        />
                    </Box>


                    <Button variant="contained" color="primary" type="submit">
                        Register
                    </Button>

                </form>

            </div>
        );


}
export default Register;