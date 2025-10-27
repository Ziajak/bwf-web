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
import {uploadAvatr} from "../../services/user-services";

function Account() {

    const {authData} = useAuth();
    const [image, setImage] = useState();
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [password2, setPassword2] = useState('');
    // const [email, setEmail] = useState('');

    // const passMatch = () => {
    //     return password === password2;
    // }

    const uploadFile = async e => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('image', image, image.name)
        console.log('Test')
        const profileData = await uploadAvatr(authData.user.profile.id, uploadData);

    }


        return (
            <div className="account-wrapper">
                <Link to={'/'}>Back</Link>
                <h1>Account</h1>
                <form onSubmit={uploadFile} className="account-form">
                    <label>
                        <p>Upload your avatar</p>
                        <TextField type="file" onChange={ e => setImage(e.target.files[0])}></TextField>
                    </label>
                <Button type="submit" variant="contained" color="primary">Upload file</Button>
                </form>

            </div>
        );


}
export default Account;