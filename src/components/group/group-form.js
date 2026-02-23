import { CssTextField} from "../layout/elements";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {styled} from "@mui/material/styles";
import {createGroup} from "../../services/group-services";
import { useRef, useEffect } from "react";

const MyBox = styled('div')(({ theme }) => ({
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        gap: '8px'
}));

export function GroupForm(){

    const { authData } = useAuth()
    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [description, setDescription] = useState();
    const navigate = useNavigate()
    const errorShown = useRef(false);

useEffect(() => {
  if (!authData?.user?.is_superuser && !errorShown.current) {
    errorShown.current = true;
    toast.error("You have to be gloal admin");
    navigate(`/`);
  }
}, [authData, navigate]);

    const handleSubmit = async e => {
        e.preventDefault();
        const dataToSend = {name, location, description};

        try {
            await createGroup(authData.token, dataToSend );
            toast.success('Group created')
            navigate(`/`)
        }
        catch (err){
            toast.error(err.message);
        }


    }

    return (
        <div>
        <Link to={`/`}><ChevronLeftIcon/></Link>
        <h1>New Group</h1>
            <form onSubmit={handleSubmit}>
                <MyBox>
                <CssTextField label="Name" onChange={e=> setName(e.target.value)}/>

                <CssTextField label="Location" onChange={e=> setLocation(e.target.value)}/>

                <CssTextField label="Description" onChange={e=> setDescription(e.target.value)}/>
                <br/>
                <br/>
                <Button variant="contained" color="primary" type={"submit"}>Create Group</Button>
                </MyBox>

            </form>

        </div>
    )
}