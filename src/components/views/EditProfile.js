/*
    dog-client is the client component of an online web implementation of dog.
    Copyright (C) 2022  Luca Zwahlen, Simona Borghi, Sandro Vonlanthen, Anton Crazzolara, Shitao Zeng

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { TextField } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { Button } from 'components/ui/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import BaseContainer from "components/ui/BaseContainer";
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';

import MenuSideBar from "components/ui/MenuSideBar";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import 'styles/views/EditProfile.scss';
import { api } from "../../helpers/api";
import updateManager from "../../helpers/updateManager";
import PopUpProfile from "./PopUpProfile";








/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */




const EditProfile = props => {
    const history = useHistory();
    const doMenu = async () => {

        history.push(`/menu`);
    };

    const [avatar, setAvatar] = React.useState('');
    const [user, setUser]= React.useState('');
    const [username,editName]= React.useState('');
    const [password,editPassword]= React.useState('');
    const [description,editDescription]= React.useState('');
    const [newAvatar,editAvatar]= React.useState('');
    const [errorFetchData,setErrorFetchData] = useState(null)


    const doEdit = async () => {
        try {
            const requestBody={}
            if (username!== null && username!==""){
                requestBody["username"]=username;
            }
            if (password!== null && password!=="" ){
                requestBody["password"]=password;
            }
            if (description!== null && description!==""){
                requestBody["description"]=description;
            }
            if (newAvatar!== null && newAvatar!==""){
                requestBody["avatar"]=newAvatar;
            }
            const requestBody1 = JSON.stringify(requestBody);
            let id =localStorage.getItem("userID")
            await api.put('/users/' + id, requestBody1,  {
                headers: {
                    'Authorization': "Basic " + localStorage.getItem("token")
                }
            });


            history.push(`/profilepage`);

        } catch (error) {
            switch(error.response.status) {
                case 405:
                    setErrorFetchData(
                        <div className="relo-errors-edit">
                            User name to short or to long
                        </div>
                    );
                    break;

                default:
                    setErrorFetchData(
                        <div className="errors">
                            Sorry something went wrong during the editing the data
                        </div>
                    )
            }
        }



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

    const handleChangeAvatar = (event) => {
        editAvatar(event.target.value);
        console.log(event)
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

  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgba(0, 0, 0, 0.23)',
        dark: "rgba(0, 0, 0, 0.23)",
        light: "rgba(0, 0, 0, 0.23)",
      },
    },
  });


    return (
        <BaseContainer>
        <MenuSideBar active="PROFILE"></MenuSideBar>

            <div className="editProfile container">
                <div className="editProfile board">
                    <ThemeProvider theme={theme}>
                    <FormControl sx={{  border: 0,  minWidth: 90 }}>
                        <Avatar  alt="Remy Sharp" src={avatar} sx={{width:90, height:90, margin:2}} />
                        <InputLabel id="demo-dialog-native" > </InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={newAvatar}
                            onChange={handleChangeAvatar}
                            autoWidth
                            label="avatar"
                            sx={{color: 'primary.light'}}
                        >
                            <MenuItem value={1}><Avatar  alt="Remy Sharp" src={'resources/avatar/1.png'} sx={{width:60, height:60}} /> </MenuItem>
                            <MenuItem value={2}><Avatar  alt="Remy Sharp" src={'resources/avatar/2.png'} sx={{width:60, height:60}} /> </MenuItem>
                            <MenuItem value={3}><Avatar  alt="Remy Sharp" src={'resources/avatar/3.png'} sx={{width:60, height:60}} /> </MenuItem>
                            <MenuItem value={4}><Avatar  alt="Remy Sharp" src={'resources/avatar/4.png'} sx={{width:60, height:60}} /> </MenuItem>
                            <MenuItem value={5}><Avatar  alt="Remy Sharp" src={'resources/avatar/5.png'} sx={{width:60, height:60}} /> </MenuItem>
                            <MenuItem value={6}><Avatar  alt="Remy Sharp" src={'resources/avatar/6.png'} sx={{width:60, height:60}} /> </MenuItem>
                            <MenuItem value={7}><Avatar  alt="Remy Sharp" src={'resources/avatar/7.png'} sx={{width:60, height:60}} /> </MenuItem>
                            <MenuItem value={8}><Avatar  alt="Remy Sharp" src={'resources/avatar/8.png'} sx={{width:60, height:60}} /> </MenuItem>
                            <MenuItem value={9}><Avatar  alt="Remy Sharp" src={'resources/avatar/9.png'} sx={{width:60, height:60}} /> </MenuItem>
                            <MenuItem value={10}><Avatar  alt="Remy Sharp" src={'resources/avatar/10.png'} sx={{width:60, height:60}} /> </MenuItem>
                            <MenuItem value={11}><Avatar  alt="Remy Sharp" src={'resources/avatar/11.png'} sx={{width:60, height:60}} /> </MenuItem>
                            <MenuItem value={12}><Avatar  alt="Remy Sharp" src={'resources/avatar/12.png'} sx={{width:60, height:60}} /> </MenuItem>
                            <MenuItem value={13}><Avatar  alt="Remy Sharp" src={'resources/avatar/13.png'} sx={{width:60, height:60}} /> </MenuItem>
                            <MenuItem value={14}><Avatar  alt="Remy Sharp" src={'resources/avatar/14.png'} sx={{width:60, height:60}} /> </MenuItem>
                        </Select>
                    </FormControl>

                    <div className="editProfile containerUserInfo">
                        <div className="editProfile userInfo">
                            Name:
                        </div>
                        <TextField id="filled-basic" placeholder={user.username} size = "small" variant="filled" inputProps={{ maxLength: 10 }} margin="normal" value={username} onChange={handleChangeName } sx={{width:1, color: 'primary.light'}} select={false}  />

                        <div className="editProfile userInfo">
                            Password:
                        </div>
                        <TextField id="filled-basic" placeholder="New Password" size = "small" variant="filled"  inputProps={{ maxLength: 20 }} margin="normal" value={password} onChange={handleChangePassword} sx={{width:1, color: 'primary.light'}} />

                        <div className="editProfile userInfo">
                            Description:
                        </div>
                        <TextField id="filled-basic" placeholder={user.description} size = "small" variant="filled" inputProps={{ maxLength: 100 }} multiline="true" margin="normal" value={description}  onChange={handleChangeStatus} sx={{width:1, color: 'primary.light'}} />
                    </div>
                    </ThemeProvider>
                        <Button className="editProfile button" variant="contained" disabled={!username && !password && !description && !newAvatar} onClick={() => doEdit()}>Save</Button>

                    {errorFetchData}
                </div>
            </div>
        </BaseContainer>
    );
}




export default EditProfile;