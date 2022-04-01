import React from 'react';
import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/ui/Lobby.scss';
import BaseContainer from "components/ui/BaseContainer";
import SideBarContainer from "components/ui/SideBarContainer";
import { DogPawLogo } from "components/ui/DogPawLogo";
import { LogoutButton } from "components/ui/LogoutButton";
import { SearchIcon } from "components/ui/SearchIcon";
import PropTypes from "prop-types";

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


const Lobby = props => {
  const history = useHistory();
  const [users, setUsers] = useState(null);
  const [members, setMembers] = useState(null);
/*

useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchDataLobby() {
      try {
        const response = await api.get('/menu/lobby/');
        setMembers(response.data);

        // This is just some data for you to see what is available.
        // Feel free to remove it.
        console.log('request to:', response.request.responseURL);
        console.log('status code:', response.status);
        console.log('status text:', response.statusText);
        console.log('requested data:', response.data);

        // See here to get more data.
        console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while fetching the lobby members! See the console for details.");
      }
    }

    fetchDataLobby();
  }, []);
*/

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
let contentSearch = <text className="search placeholder"> No users found </text>;

if(users){
    <ul className="game user-list">
      {users.map(user => (
        <Player user={user} key={user.id}/>
      ))}
    </ul>
}

if(members){
}


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
              <LogoutButton width="40px" height="40px"/>
            </div>
          </div>
        </SideBarContainer>
        <div className="lobby container">
        <h1 className="lobby"> LOBBY </h1>
          <div className="lobby member-container">
              <div className="lobby circle">
                <DogPawLogo width="70px" height="70px"/>
              </div>
              <div className="lobby member">Dog1</div>
          </div>
          <div className="lobby member-container">
              <div className="lobby circle">
                <DogPawLogo width="70px" height="70px"/>
              </div>
              <div className="lobby member">Dog2</div>
          </div>
          <div className="lobby member-container">
              <div className="lobby circle">
                <DogPawLogo width="70px" height="70px"/>
              </div>
              <div className="lobby member">Dog3</div>
          </div>
          <div className="lobby member-container">
              <div className="lobby circle">
                <DogPawLogo width="70px" height="70px"/>
              </div>
              <div className="lobby member">Dog4</div>
          </div>
          <div className="lobby button">
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
