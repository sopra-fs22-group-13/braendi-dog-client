import React, {useEffect} from "react";
import 'styles/views/EditProfile.scss';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";

import 'styles/views/EditProfile.scss';
import Button from '@mui/material/Button';

import Avatar from '@mui/material/Avatar';

import LogoutIcon from "@mui/icons-material/Logout";

import TextareaAutosize from '@mui/material/TextareaAutosize';

import {useState} from "react";
import {TextField} from "@mui/material";
import {api, handleError} from "../../helpers/api";
import PopUpProfile from "./PopUpProfile";
import updateManager from "../../helpers/updateManager";
import MenuSideBar from "components/ui/MenuSideBar";


/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */




const EditProfile = props => {
    const history = useHistory();
    const popup= <PopUpProfile userId={1} />;
    const doMenu = async () => {

        history.push(`/menu`);
    };

    const [avatar, setAvatar] = React.useState('');
    const [user, setUser]= React.useState('');
    const [username,editName]= React.useState('');
    const [password,editPassword]= React.useState('');
    const [description,editDescription]= React.useState('');
    const [errorFetchData,setErrorFetchData] = useState(null)

    const doEdit = async () => {
        try {
            const requestBody={}
            if (username !== null){
                requestBody["username"]=username;
            }
            if (password !== null){
                requestBody["password"]=password;
            }
            if (description!== null){
                requestBody["description"]=description;
            }
            const requestBody1 = JSON.stringify(requestBody);
            let id =localStorage.getItem("userID")
            await api.put('/users/' + id, requestBody1,  {
                headers: {
                    'Authorization': "Basic " + localStorage.getItem("token")
                }
            });


        } catch (error) {
            setErrorFetchData(
                <div className="errors">
                    Sorry something went wrong during the editing the data
                </div>
            )
        }

        history.push(`/menu`);

    };

    const logout = () => {
        updateManager.disconnectFromPersonalUpdate();
        localStorage.clear();
        history.push('/login');
    }



    const handleChangeName = (event) => {
        editName(event.target.value);
    };
    const handleChangePassword = (event) => {
        editPassword(event.target.value);
    };
    const handleChangeStatus = (event) => {
        editDescription(event.target.value);
    };

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {

            try {
                let userId =localStorage.getItem("userID")
                const response = await api.get("/users/"+userId, {
                    headers: {
                        'Authorization': "Basic " + localStorage.getItem("token")
                    }
                });

                setUser(response.data);
                setAvatar('resources/avatar/'+response.data.avatar+'.png');

            } catch (error) {
                setErrorFetchData(
                    <div className="errors">
                        Sorry something went wrong during the fetching the data
                    </div>
                )
            }
        }

        fetchData();
    }, []);


    return (
        <BaseContainer>
        <MenuSideBar active="PROFILE"></MenuSideBar>

            <div className="editProfile container">
                <div className="editProfile board">
                    <div className="editProfile title">
                        Edit Your profile  {popup }
                    </div>
                    <Avatar  alt="Remy Sharp" src={avatar} sx={{width:90, height:90}} />
                    <div className="editProfile containerUserInfo">
                        <div className="editProfile userInfo">
                            Name: {user.username}
                        </div>
                        <TextField id="filled-basic" label="New Username" size = "small" variant="filled" inputProps={{ maxLength: 10 }} margin="normal" value={username} onChange={handleChangeName}  />
                        <div className="editProfile userInfo">
                            Password
                        </div>
                        <TextField id="filled-basic" label="New Password" size = "small" variant="filled"  inputProps={{ maxLength: 10 }} margin="normal" value={password} onChange={handleChangePassword} />
                        <div className="editProfile userInfo">
                            Description: {user.description}
                        </div>
                        <TextField id="filled-basic" label="New Status" size = "small" variant="filled" inputProps={{ maxLength: 256 }} margin="normal" value={description}  onChange={handleChangeStatus} />
                    </div>
                    <div  className="editProfile button">
                        <Button variant="contained" disabled={!username && !password && !description} onClick={() => doEdit()}>Edit</Button>
                    </div>
                    {errorFetchData}
                </div>
            </div>
        </BaseContainer>
    );
}




export default EditProfile;