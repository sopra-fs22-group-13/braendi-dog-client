import React from 'react';
import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Lobby.scss';
import BaseContainer from "components/ui/BaseContainer";
import PetsIcon from '@mui/icons-material/Pets';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from "prop-types";

import { VoiceChatManager } from 'components/voice/voiceChat';
import updateManager from 'helpers/updateManager';

import { getMarbleLocation } from 'helpers/getMarbleLocation';
import { addError, addInfo, addSuccess } from './ErrorDisplay';
import { CribSharp } from '@mui/icons-material';
import { moveManager } from 'helpers/moveManager';


async function invitePlayer(inviteeId) {
    try {
        await api.put("/lobby/" + localStorage.getItem("lobbyId") + "/invitations", {inviteeID: inviteeId}, {
            headers: {
                'Authorization': "Basic " + localStorage.getItem("token")
            }
        });
        addSuccess("Invited player with id: " + inviteeId);
    } catch (error) {
        switch (error.response.status) {
            case 401:
                console.error("Unauthorized", error);
                addError("Unauthorized");
                break;
            case 404:
                console.error("Either the requested player or lobby were not found.", error);
                addError("Either the requested player or lobby were not found.");
                break;
            default:
                console.error("Something unexpected went wrong.", error);
                addError("Something unexpected went wrong.");
                break;
        }
    }
}


const Player = ({user}) => (
  <div className="player container" onClick={() => invitePlayer(user.id)}>
    <div className="player username">{user.username}</div>
  </div>
);

Player.propTypes = {
  user: PropTypes.object
};


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


useEffect(() => {
    //fetches all members in the lobby
    async function fetchDataLobby() {
      try {
        const response = await api.get('/lobby/' + localStorage.getItem("lobbyId"), {
          headers: {
              'Authorization': "Basic " + localStorage.getItem("token")
          }
      });
        var memberList = [];
        for (let i=0; i<response.data.usernames.length; i++) {
            memberList.push({username: response.data.usernames[i],
                            id: response.data.userIDs[i]});
        }
        setMembers(memberList);

      } catch (error) {
        if(error.respone.status = 404){
          history.push("/menu");
        }
        addError("Could not fetch lobby members", 5000);
        console.error("Details:", error);
      }
    }

    function startUpdateListener(event)
    {
      let gametoken = event.detail.gameToken;
      if(gametoken)
      {
        localStorage.setItem("gametoken", gametoken);
        history.push("/game");
      }
    }
    //only add the listener on initial render, otherwise we have multiple
    //check if the game gets started
    document.addEventListener("startUpdate", startUpdateListener);

    function lobbyUpdateListener(e)
    {
      fetchDataLobby();
    }

    document.addEventListener("lobbyUpdate", lobbyUpdateListener);

    fetchDataLobby();
    fetchDataSearch();

    return () => { // This code runs when component is unmounted
      document.removeEventListener("lobbyUpdate", lobbyUpdateListener);
      document.removeEventListener("startUpdate", startUpdateListener); // (4) set it to false when we leave the page

    }

  }, []);


// fetches all currently logged in users
async function fetchDataSearch(filter = "") {
      try {
        const response = await api.get('/users', {
          headers: {
              'Authorization': "Basic " + localStorage.getItem("token")
          }
        });

        const data = response.data.slice();
        response.data.forEach(user => {
            if (!user.username.includes(filter)) {
                const index = data.indexOf(user);
                data.splice(index, 1);
            }
        });
        setUsers(data);

        console.log('request to:', response.request.responseURL);
        console.log('status code:', response.status);
        console.log('status text:', response.statusText);
        console.log('requested data:', response.data);

        console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
        addError("Could not fetch users", 5000);
        console.error("Details:", error);
      }
    }

const logout = () => {
    updateManager.disconnectFromPersonalUpdate();
    localStorage.clear();
    history.push('/login');
}

const startGame= async () => {
  try{
    let response = await api.post('/game', {lobbyID: localStorage.getItem("lobbyId")}, {
      headers: {
          'Authorization': "Basic " + localStorage.getItem("token")
      }
  });
  }catch(error){

    if(!error.response)
    {
      return 5;
    }

    if(error.response.status == 400)
    {
      return 1;
    }
    if(error.response.status == 401)
    {
      return 2;
    }
    if(error.response.status == 404)
    {
      return 3;
    }
    return 5;
  }
}

let contentSearch = <text className="search placeholder"> No users found </text>;

if(users){
    contentSearch =(
        <React.Fragment>
          {users.map(user => (
            <Player user={user} key={user.id}/>
          ))}
        </React.Fragment>
    );
}
let contentLobby;

function onEnterKey(key, input) {
    if (key === 'Enter') {
        fetchDataSearch(input);
    }  
}


if(members){
    contentLobby = (
    <div>
        {members.map(member => (
        <Member member={member} key={member.id}/>
        ))}
    </div>
    );
}


async function tryStartGame(e)
{
  console.log("trying to start game...");
  if(members && members.length == 4)
  {
    //full
    let errorcode = await startGame();
    if(errorcode == 1) addError("Not enough Players to start", 5000);
    if(errorcode == 2) addInfo("Only the Owner can start the game", 5000);
    if(errorcode == 3) addError("This lobby does not exist", 5000);
    if(errorcode == 4) addError("Could not send start request: response unknown", 5000);
    if(errorcode == 5) addError("Could not send start request: unknown error", 5000);
    //e.target.disabled = false;
  }
}


let lobbyButton =
    <div className={(members && members.length == 4? "lobby start": "lobby button")} onClick={(e) => tryStartGame(e) }>
         {members? members.length : 0}/4
    </div>

  //test voiceChat here, as there is not game yet.
  useEffect(() => {
    updateManager.connectToPersonalUpdate();
    VoiceChatManager.startListening();
  }, []);


  return (
    <BaseContainer>
      <div className="side-bar container">
        <div>
          <h1> Dog </h1>
          <Button
            className="side-bar button active"
          >
            Create Game
          </Button>
        </div>
        <div>
          <Button
            className="side-bar button"
          >
            Profile
          </Button>
          <div className="side-bar logout"
            onClick={() => logout()}>
            <LogoutIcon />
          </div>
        </div>
      </div>

        <div className="lobby container">
          <h1 className="lobby"> LOBBY </h1>
          <div className="lobby member-container">
              <div className="lobby circle">
                <PetsIcon />
              </div>
              <div className="lobby member">{members && members[0]? members[0].username : "EMPTY"}</div>
          </div>
          <div className="lobby member-container">
              <div className="lobby circle">
                <PetsIcon />
              </div>
              <div className="lobby member">{members && members[1]? members[1].username : "EMPTY"}</div>
          </div>
          <div className="lobby member-container">
              <div className="lobby circle">
                <PetsIcon />
              </div>
              <div className="lobby member">{members && members[2]? members[2].username : "EMPTY"}</div>
          </div>
          <div className="lobby member-container">
              <div className="lobby circle">
                <PetsIcon />
              </div>
              <div className="lobby member">{members && members[3]? members[3].username : "EMPTY"}</div>
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
                        onKeyDown={e => onEnterKey(e.key, e.target.value)}
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
