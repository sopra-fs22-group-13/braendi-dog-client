import React, {useEffect, useRef, useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Menu.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import Header from "components/views/Header";
import updateManager from 'helpers/updateManager';
import { DiscountRounded } from '@mui/icons-material';
import { addError, addInfo } from './ErrorDisplay';
import Popup from "./PopUpEditProfile";
import LogoutIcon from '@mui/icons-material/Logout';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';


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

const Player = ({user}) => (
  <div className="player container">
    <div className="player rank"> 1 </div>
    <div className="player username">{user.username}</div>
    <EmojiEventsIcon/>
    <div className="player wins"> {user.win}</div>
  </div>
);

Player.propTypes = {
  user: PropTypes.object
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
    const [users, setUsers] = useState(null);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const Invite = ({invite}) => (
        <div className="invites singleInvites">
            <div className='invites inviteText'>
                {invite.name}
            </div>
            {/* <div className='invites inviteText'> {invite.name} </div> */}
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

    async function fetchDataSearch() {
          try {
            const response = await api.get('/users', {
              headers: {
                  'Authorization': "Basic " + localStorage.getItem("token")
              }
            });

            setUsers(response.data);

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

    let contentLeaderboard = <text className="info placeholder"> No users found </text>;

    if(users){
        contentLeaderboard =(
            <React.Fragment>
              {users.map(user => (
                <Player user={user} key={user.id}/>
              ))}
            </React.Fragment>
        );
    }

  return (
      <div>
          <BaseContainer>

              {isOpen && <Popup
                  content={<div className="info-block">
                                       <h1>Rules</h1>
                                       <h2>Goal</h2>
                                       To win you have to move all your marbles in the indicated goal room.
                                       <h2>Process</h2>
                                       Each round, one player after another plays a card and moves their marbles (see Possible Moves). If a player cannot move, all their cards get removed and they have to skip the rest of the round.
                                       A player must always play a move if they are able to!
                                       A round is over when no one has any cards left. <br/> Each round starts with a different amount of cards: The first round starts with 6 cards, then 5, 4, 3, 2 and then it starts over again with 6, 5, ...
                                       <h2>Start</h2>
                                       A starting move can be done with an Ace, a King or a Joker. With it, a marble can be moved on the marked starting position.
                                       <br/>Important: A marble that lands on the starting position the first time cannot be sent home or overtaken!
                                       <h2>Card Values</h2>
                                       Two to Ten: according to their name<br/>
                                       Four: backwards or forwards<br/>
                                       Seven: can be split between marbles<br/>
                                       Jack: switch your marble with another (can be one of your own)<br/>
                                       Queen: 12 points<br/>
                                       King: 13 Points or a starting move<br/>
                                       Ace: 1 or 11 Points of a starting move<br/>
                                       Joker: any of the mentioned card values
                                       <h2>Sending Home</h2>
                                       You can always overtake other marbles, but if you overtake them with a 7 or land ontop of them, the marble that was there before is sent back to the starting container. This is also the case if the marble is your own.
                                       <h2>Goal Area</h2>
                                       To join the goal area, a marble must move forwards over the starting position directly in the goal area. You cannot overtake (or move backwards) in the goal area.
                                       <h2>Further Information</h2>
                                       The rules are further explained <a href="http://www.dogspiel.info/images/pdfs/regeln/regeln.pdf" target="_blank">here</a>.
                                   </div>}
                  handleClose={togglePopup}
              />}

              <div className="side-bar container">
                  <div>
                    <h1> Dog </h1>
                    <Button
                      className="side-bar button active"
                    >
                      Menu
                    </Button>
                    <Button
                      className="side-bar button"
                      onClick={() => createNewLobby()}
                    >
                      Create Game
                    </Button>
                    <Button
                      className="side-bar button"
                      onClick={() => profilePage()}
                    >
                      Profile
                    </Button>
                  </div>
                  <div>
                    <Button
                      className="side-bar button"
                      onClick={() => togglePopup()}
                    >
                      Rules
                    </Button>
                    <div className="side-bar logout"
                      onClick={() => logout()}>
                      <LogoutIcon />
                    </div>
                  </div>
              </div>


              <div className="invites container">
                  <h1>Invites</h1>
                  <ul className="invites inviteslist">
                      {invites.map(invite => (
                          <Invite invite={invite} key={invite.lobbyId} />
                      ))}
                      {
                          invites && invites.length == 0? <div className='invites singleInvites'>Invites from other players show up here.</div>: null}
                  </ul>

                  <div className="invites createGame">
                      <Button className="invites button" onClick={() => createNewLobby()}>
                          Create Game
                      </Button>
                  </div>
              </div>


              <div className="info userInfo">
                  <h1> Leaderboard </h1>
                  <div className="info user-list">
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
