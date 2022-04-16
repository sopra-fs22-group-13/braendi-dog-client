import React from 'react';
import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Lobby.scss';
import BaseContainer from "components/ui/BaseContainer";
import SideBarContainer from "components/ui/SideBarContainer";
import PetsIcon from '@mui/icons-material/Pets';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from "prop-types";

import { startListening } from 'components/voice/voiceChat';
import { connectToPersonalUpdate } from 'helpers/updateManager';

import { getMarbleLocation } from 'helpers/getMarbleLocation';

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const Player = ({user}) => (
  <div className="player container">
    <div className="player username">{user.username}</div>
  </div>
);

Player.propTypes = {
  user: PropTypes.object
};

const LobbyButton = (props) => (
    <div className="lobby button">
            <text> members.length/4 </text>
    </div>
);

const Member = ({member}) => {
    return(
    <div className="lobby member-container">
      <div className="lobby circle">
        <PetsIcon />
      </div>
      <label className="lobby member"> {member.username} </label>
    </div>
    );
};

Member.propTypes = {
  member: PropTypes.object
};

const Lobby = props => {
  const history = useHistory();
  const [users, setUsers] = useState(null);
  const [members, setMembers] = useState(null);
/*
// fetches all members in the lobby
useEffect(() => {
    async function fetchDataLobby() {
      try {
        const response = await api.get('/menu/lobby/');
        setMembers(response.data);

      } catch (error) {
        console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while fetching the lobby members! See the console for details.");
      }
    }

    fetchDataLobby();
  }, []);
*/

// fetches all currently logged in users
async function fetchDataSearch() {
      try {
        const response = await api.get('/menu/users');

        setUsers(response.data);

        console.log('request to:', response.request.responseURL);
        console.log('status code:', response.status);
        console.log('status text:', response.statusText);
        console.log('requested data:', response.data);

        console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while fetching the users! See the console for details.");
      }
    }

const logout = () => {
    localStorage.removeItem('token');
    history.push('/login');
}

const startGame= async () => {
    await api.post('/game', 'insertCorrectLobbyID');
    history.push('/game');
}

let contentSearch = <text className="search placeholder"> No users found </text>;

if(users){
    contentSearch =(
        <ul className="game user-list">
          {users.map(user => (
            <Player user={user} key={user.id}/>
          ))}
        </ul>
    );
}
let contentLobby;

if(members){
    contentLobby = (
    <div>
        {members.map(member => (
        <Member member={member} key={member.id}/>
        ))}
    </div>
    );
}


let lobbyButton =
    <div className="lobby button">
         2/4
    </div>
/*
if(members.length === 4){
    lobbyButton = (
        <div className="lobby start"
             onClick={() => startGame()}>
             Start
        </div>
    );
}
*/

  //test voiceChat here, as there is not game yet.
  useEffect(() => {
    connectToPersonalUpdate();
    startListening();
  }, []);


  return (
    <BaseContainer>
        <SideBarContainer className="side-bar-container">
          <div className="side-bar container">
            <div>
              <h1> Dog </h1>
              <Button
                className="side-bar button"
                width="100%"
                onClick={() =>history.push(`/menu`)}
              >
                Start
              </Button>
              <Button
                className="side-bar button active"
                width="100%"
              >
                Create Game
              </Button>
            </div>
            <div>
              <Button
                className="side-bar button"
                width="100%"
              >
                Profile
              </Button>
              <div className="side-bar logout"
                onClick={() => logout()}>
                <LogoutIcon />
              </div>
            </div>
          </div>
        </SideBarContainer>

        <div className="lobby container">
          <h1 className="lobby"> LOBBY </h1>
          <div className="lobby member-container">
              <div className="lobby circle">
                <PetsIcon />
              </div>
              <div className="lobby member">Dog1</div>
          </div>
          <div className="lobby member-container">
              <div className="lobby circle">
                <PetsIcon />
              </div>
              <div className="lobby member">Dog2</div>
          </div>
          <div className="lobby member-container">
              <div className="lobby circle">
                <PetsIcon />
              </div>
              <div className="lobby member">Dog3</div>
          </div>
          <div className="lobby member-container">
              <div className="lobby circle">
                <PetsIcon />
              </div>
              <div className="lobby member">Dog4</div>
          </div>
          <div>
          {lobbyButton}
          </div>
        </div>

        <div className="search container">
            <div className="search searchbox">
                <div className="search searchbar">
                    <input
                        className="search input"
                        placeholder="Enter search here"
                        //onChange={e => props.onChange(e.target.value)}
                    />
                </div>
                <div className="search user-list">
                    {contentSearch}
                </div>
            </div>
        </div>
    </BaseContainer>
  );
};

export default Lobby;
