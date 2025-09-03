import React, {useState} from 'react'
import { useAuth } from "../../hooks/useAuth";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from '@mui/icons-material/Email';
import TextField from "@mui/material/TextField";
import KeyIcon from "@mui/icons-material/Key";
import {Button} from "@mui/material";
import {register} from "../../services/user-services";
import {auth} from "../../services/user-services";
function Account() {

    const {authData} = useAuth();
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [password2, setPassword2] = useState('');
    // const [email, setEmail] = useState('');

    // const passMatch = () => {
    //     return password === password2;
    // }

    const handleSubmit = async e => {
        e.preventDefault();


    }


        return (
            <div>
                <Link to={'/'}>Back</Link>
                <h1>Account</h1>

            </div>
        );


}
export default Account;