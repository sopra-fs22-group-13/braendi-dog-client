import { ThemeProvider } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import PetsIcon from '@mui/icons-material/Pets';
import { IconButton } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import BaseContainer from "components/ui/BaseContainer";
import { Button } from 'components/ui/Button';
import MenuSideBar from 'components/ui/MenuSideBar';
import { VoiceChatManager } from 'components/voice/voiceChat';
import { api } from 'helpers/api';
import updateManager from 'helpers/updateManager';
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'styles/views/Lobby.scss';
import { addError, addInfo, addSuccess } from './ErrorDisplay';
import PopUpProfile from "./PopUpProfile";



function colorStatus(status){
    if (status==='ONLINE')
        return "rgba(165,231,109,1)"
    else
        return "rgba(231,111,109,1)"

}

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

let background
const Player = ({user}) => (
  <div className="player container" onClick={() => invitePlayer(user.id)}>
    <div className="player status" style={{background:colorStatus(user.status)}}></div>
    <div className="player username">
        {user.username}</div>
    <AddIcon/>
  </div>
);

Player.propTypes = {
  user: PropTypes.object
};


const Member = ({member}) => {
    if (member=="EMPTY"){

        return   <label className="lobby member"><Button style={{textTransform: 'none', fontSize: '24px', backgroundColor:'#F7F8F1'}} >{member}</Button></label>
    }
    else {
        return (
            <label className="lobby member"><PopUpProfile userId={member.id} fontSize='24px'/> </label>
        );
    }
};

Member.propTypes = {
  member: PropTypes.object
};

const Lobby = props => {
  const history = useHistory();
  const [users, setUsers] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [members, setMembers] = useState(null);


useEffect(() => {

    updateManager.connectToPersonalUpdate();


    //fetches all members in the lobby
    async function fetchDataLobby() {
      try {
        const response = await api.get('/lobby/' + localStorage.getItem("lobbyId"), {
          headers: {
              'Authorization': "Basic " + localStorage.getItem("token")
          }
      });
      console.log(response.data)
        var memberList = [];
        for (let i=0; i<response.data.usernames.length; i++) {
            memberList.push({username: response.data.usernames[i],
                            id: response.data.userIDs[i]});
        }
        setMembers(memberList);

      } catch (error) {
        if(error.response.status == 404){
          history.push("/menu");
          addInfo("Lobby closed", 5000);
        }else
        {
          addError("Could not fetch lobby members", 5000);
          console.error("Details:", error);
        }

      }
    }

    function startUpdateListener(event)
    {
      let gametoken = event.detail.gameToken;
      if(gametoken)
      {
        localStorage.setItem("gametoken", gametoken);

        //ugly fix, but necessary because localStorage, despite being a synchronious call, is not synchronious...
        //100ms should be enough
        setTimeout(() => {
          history.push("/game");
        }, 100);
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

      } catch (error) {
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

let contentSearch = <p className="search placeholder"> No users found </p>;

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
    <div className={members && members.length == 4? "lobby start": "lobby button"} onClick={(e) => tryStartGame(e) }>
      {
        members && localStorage.getItem("userID") == members[0].id && members.length == 4? "START" : ((members? members.length : "0") + "/4")  
      }
    </div>

  //test voiceChat here, as there is not game yet.
  useEffect(() => {
    updateManager.connectToPersonalUpdate();
    VoiceChatManager.startListening();
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#F7F8F1',
        dark: "#F7F8F1",
        light: "#F7F8F1",
      },
    },
  });

  return (
    <BaseContainer>
        <MenuSideBar active="LOBBY"></MenuSideBar>
        <div className="lobby container">
          <h1 className="lobby"> LOBBY </h1>
          <div className="lobby member-container">
              <div className="lobby circle">
                <PetsIcon />
              </div>
              {members && members[0]? <Member member={members[0]}></Member> : <Member member={"EMPTY"}></Member>}
          </div>
          <div className="lobby member-container">
              <div className="lobby circle">
                <PetsIcon />
              </div>
              {members && members[1]? <Member member={members[1]}></Member> : <Member member={"EMPTY"}></Member>}
          </div>
          <div className="lobby member-container">
              <div className="lobby circle">
                <PetsIcon />
              </div>
              {members && members[2]? <Member member={members[2]}></Member> : <Member member={"EMPTY"}></Member>}
          </div>
          <div className="lobby member-container">
              <div className="lobby circle">
                <PetsIcon />
              </div>
              {members && members[3]? <Member member={members[3]}></Member> : <Member member={"EMPTY"}></Member>}
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
                    <ThemeProvider theme={theme}>
                    <IconButton onClick={() => {fetchDataSearch();}}>
                        <CachedIcon   sx={{
                          color: 'primary.light',
                        }}></CachedIcon>
                      </IconButton>
                    </ThemeProvider>

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
