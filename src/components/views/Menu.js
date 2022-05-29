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

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BaseContainer from "components/ui/BaseContainer";
import { Button } from 'components/ui/Button';
import MenuSideBar from 'components/ui/MenuSideBar';
import { api } from 'helpers/api';
import updateManager from 'helpers/updateManager';
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'styles/views/Menu.scss';
import { addError } from './ErrorDisplay';
import PopUpProfile from "./PopUpProfile";


function colorStatus(status){
    if (status==='ONLINE')
        return "rgba(165,231,109,1)"
    else
        return "rgba(231,111,109,1)"

}

const FormField = props => {
    return (
        <div className="content field">
            <label className="content label">
                {props.label}
            </label>
            <input
                className="content input"
                placeholder= {props.text}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};
FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

const Player = ({user,position}) => (
  <div className="menuplayer container">
    <div className="menuplayer rank"> {position+1} </div>
    <div className="menuplayer username"><PopUpProfile userId={user.id} style={{'font-size': '22px'}}/></div>
    <div className="menuplayer status" style={{background:colorStatus(user.status)}}></div>
    <EmojiEventsIcon/>
    <div className="menu player wins">{user.wins}  </div>
  </div>
);

Player.propTypes = {
  user: PropTypes.object,
  position: PropTypes.number
};

const Menu = props => {
    const history = useHistory();
    const [invites, setInvites] = useState([]);
    const [update, setUpdate] = useState(false);
    const componentMounted = useRef(true); // (3) component is mounted
    const [isOpen, setIsOpen] = useState(false);
    const [editPassword, setEditPassword] = useState(null);
    const [editName, setEditName] = useState(null);
    const [errorEdit, setErrorEdit] = useState(null);
    const [usersTop, setUsersTop] = useState(null);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const Invite = ({invite}) => (
        <div className="invites singleInvites">
            <div className='invites inviteText'>
                {invite.name}
            </div>
            <div className="invites inviteButton" onClick={() => acceptInvite(invite.lobbyId)} > Join </div>
        </div>
    );

    Invite.propTypes = {
        invite: PropTypes.object
    };

    //needs to recive all invites with token

    async function acceptInvite (lobbyId){
        try {
            const serverResponse = await api.put("/invitations", {lobbyID: lobbyId, response: true}, {
                headers: {
                    'Authorization': "Basic " + localStorage.getItem("token")
                }
            });
            localStorage.setItem("lobbyId", lobbyId);

            history.push("/lobby");
        } catch (error) {
            switch (error.response.status) {
                case 401:
                    console.error("Unauthorized", error);
                    addError("Unauthorized");
                    break;
                case 404:
                    console.error("Lobby not found.", error);
                    addError("We couldn't find that lobby. Maybe it doesn't exist anymore.");
                    break;
                default:
                    console.error("Something went wrong.", error);
                    addError("Something unexpected went wrong.");
                    break;
            }
        }
    }

    async function denyInvite (lobbyId){
        try {
            const serverResponse = await api.put("/invitations", {lobbyID: lobbyId, response: false}, {
                headers: {
                    'Authorization': "Basic " + localStorage.getItem("token")
                }
            });
            const lobbyToRemove = invites.find(lobby => lobby.lobbyId == lobbyId);
            const index = invites.indexOf(lobbyToRemove);
            invites.splice(index, 1);
        } catch (error) {
            switch (error.response.status) {
                case 401:
                    console.error("Unauthorized", error);
                    addError("Unauthorized");
                    break;
                case 404:
                    console.error("Lobby not found.", error);
                    addError("We couldn't find that lobby. Maybe it doesn't exist anymore.");
                    break;
                default:
                    console.error("Something went wrong.", error);
                    addError("Something unexpected went wrong.");
                    break;
            }
        }
    }

    const logout = () => {
        updateManager.disconnectFromPersonalUpdate();
        localStorage.clear();
        history.push('/login');
    }
    const profilePage = () => {
        history.push('/profilepage');
    }

    const doEdit = async () =>{
        try {
            const requestBody = JSON.stringify({editName, editPassword});
            const response = await api.post('/edit', requestBody);

            localStorage.setItem('userName', response.data.username);
            setIsOpen(!isOpen);
        } catch (error) {
            setErrorEdit(
                <div className="errors">
                    Sorry your registration didn't work
                </div>
            )
        }
    }

    async function createNewLobby() {
        try {
            const response = await api.post("/lobby", null, {
                headers: {
                    'Authorization': "Basic " + localStorage.getItem("token")
                }
            });
            localStorage.setItem("lobbyId", response.data.lobbyID);
            history.push('/lobby');
        } catch (error) {
            switch (error.response.status) {
                case 401:
                    console.error("Unauthorized", error);
                    addError("Unauthorized");
                    break;
                case 409:
                    console.error("You are already in a lobby.", error);
                    addError("You are already in a lobby.");
                    break;
                default:
                    console.error("Something went wrong.", error);
                    addError("Something unexpected went wrong.");
                    break;
            }
        }
    }

    useEffect(() => {
        async function fetchDataSearch() {
            try {
                const response = await api.get('/users/leaderboard', {
                    headers: {
                        'Authorization': "Basic " + localStorage.getItem("token")
                    }
                });

                setUsersTop(response.data);

            } catch (error) {
                addError("Could not fetch users", 5000);
                console.error("Details:", error);
            }
        }
        fetchDataSearch()

        updateManager.connectToPersonalUpdate();

        function inviteUpdateListener(event)
        {
            const id = event.detail.lobbyId;
            const name = event.detail.ownerName;
            //handle new invite
            let invite = new Object();
            invite.name = name;
            invite.lobbyId = id;

            if(componentMounted.current){
                invites.push(invite);
                setUpdate(!update);
                setInvites(invites.slice());
            }
        }

        document.addEventListener("inviteUpdate", inviteUpdateListener);

        return () => { // This code runs when component is unmounted
            componentMounted.current = false; // (4) set it to false when we leave the page
            document.removeEventListener("inviteUpdate", inviteUpdateListener);
        }

    }, []);

    let contentLeaderboard = <p className="menu info placeholder"> No users found </p>;
    let position=0;

    if(usersTop){
        contentLeaderboard =(
            <React.Fragment>
              {usersTop.map(user => (
                <Player user={user} position={usersTop.indexOf(user)}/>

              ))}
            </React.Fragment>
        );
    }

  return (
      <div>
          <BaseContainer>

                <MenuSideBar active="MENU"></MenuSideBar>


              <div className="invites container">
                  <h1>Invites</h1>
                  <ul className="invites inviteslist">
                      {invites.map(invite => (
                          <Invite invite={invite} key={invite.lobbyId} />
                      ))}
                      {invites && invites.length == 0? <div className='invites invite-placeholder'>Invites from other players show up here.</div>: null}
                  </ul>

                  <div className="invites createGame">
                      <Button className="invites button" onClick={() => createNewLobby()}>
                          Create Game
                      </Button>
                  </div>
              </div>


              <div className="menu info userInfo">
                  <h1> Leaderboard </h1>
                  <div className="menu info user-list">
                     {contentLeaderboard}
                  </div>
               </div>
          </BaseContainer>
      </div>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Menu;
