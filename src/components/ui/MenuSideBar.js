import LogoutIcon from '@mui/icons-material/LogoutSharp';
import { addError } from 'components/views/ErrorDisplay';
import { api } from 'helpers/api';
import updateManager from 'helpers/updateManager';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'styles/ui/MenuSideBar.scss';

import { Button } from './Button';
import { RulesPopup } from './RulesPopup';

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

        {<RulesPopup open={rulesPopupOpen} onClose={togglePopup}/>}

        <div className="side-bar container">
                  <div>
                    <img src="/resources/logo_dark.svg"></img>
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