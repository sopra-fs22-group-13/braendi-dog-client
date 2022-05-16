import Popup from 'components/views/PopUpEditProfile';
import React, { useState } from 'react';
import 'styles/ui/MenuSideBar.scss';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import { addError } from 'components/views/ErrorDisplay';
import updateManager from 'helpers/updateManager';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from './Button';

const MenuSideBar = props =>
{
    const [rulesPopupOpen, setRulesPopupOpen] = useState(false);
    const history = useHistory();

    const logout = () => {
        updateManager.disconnectFromPersonalUpdate();
        localStorage.clear();
        history.push('/login');
    }

    const profilePage = () => {
        history.push('/profilepage');
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

    const togglePopup = () => {
        setRulesPopupOpen(!rulesPopupOpen);
    }

    const menuPage = ()  => {
        history.push('/menu');
    }

    return (
        <React.Fragment>

        {rulesPopupOpen && <Popup
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
                      className={props.active == "MENU" ? "side-bar button active" : "side-bar button"}
                      onClick={() => menuPage()}
                      >
                      Menu
                    </Button>
                    <Button
                      className={props.active == "LOBBY" ? "side-bar button active" : "side-bar button"}
                      onClick={() => createNewLobby()}
                    >
                      Create Game
                    </Button>
                    <Button
                      className={props.active == "PROFILE" ? "side-bar button active" : "side-bar button"}
                      onClick={() => profilePage()}
                    >
                      Profile
                    </Button>
                  </div>
                  <div>
                    <Button
                      className={"side-bar button"}
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

        </React.Fragment>
    );
}


export default MenuSideBar;