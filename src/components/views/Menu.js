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

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */





const Menu = props => {
    const history = useHistory();
    const [invites, setInvites] = useState([]);
    const [update, setUpdate] = useState(false);
    const componentMounted = useRef(true); // (3) component is mounted
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

    function acceptInvite (lobbyId){
        //accept invite
        history.push("/lobby");
        //alert(lobbyId);
    }

    const logout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }

    async function createNewLobby() {
        try {
            const response = await api.post("/lobby", null, {
                headers: {
                    'Authorization': "Basic " + localStorage.getItem("token")
                }
            });
            localStorage.setItem("lobbyId", response.data.lobbyID);
            console.log("worked fine");
            console.log(response.data.lobbyID);
            history.push('/lobby');
        } catch (error) {
            switch (error.response.status) {
                case 401:
                    console.error("Authentication failed.");
                case 409:
                    console.error("You are already in a lobby.");
                default:
                    console.error("Something went wrong.");
            }
        }
    }

    useEffect(() => {

        updateManager.connectToPersonalUpdate();

        document.addEventListener("inviteUpdate", (e) => {
            const id = e.detail.lobbyId;
            const name = e.detail.ownerName;

            //handle new invite
            let invite = new Object();
            invite.name = name;
            invite.lobbyId = id;

            if(componentMounted.current){
                invites.push(invite);
                setUpdate(!update);
            }

        })

        let invite = new Object();
        invite.name = "HELLO";
        invite.lobbyId = 14;

        invites.push(invite);
        setUpdate(!update);

        return () => { // This code runs when component is unmounted
            componentMounted.current = false; // (4) set it to false when we leave the page
        }
    }, []);

  return (
      <div>
          <Header height="100"/>
          <BaseContainer>
              <div className="menuContainer">
                  <div className="info userInfo">

                          <div className="info foto">
                          </div>
                      <div className="info infoContainer">
                          <div className="info nickName">
                              NickName
                          </div>
                          <div className="info singleInfo">
                              Name:
                          </div>
                          <div className="info singleInfo">
                              Birthday:
                          </div>
                          <div className="info singleInfo">
                              Wins:
                          </div>
                          <div className="info singleInfo">
                              More Stats:
                          </div>
                      </div>

                      <div className="info button-container">
                          <Button width="60%" >
                              Edit
                          </Button>
                          <div className="info spaceUp"> </div>
                          <Button width="60%"  onClick={() => logout()}
                          >
                              Logout
                          </Button>
                      </div>
                  </div>
                  <div className="line lineverticalright"> </div>
                  <div className="line lineverticalleft"> </div>

                  <div className="invites container">
                      <div className="invites titleInvites">Invites</div>
                      <ul className="invites inviteslist">
                          {invites.map(invite => (
                              <Invite invite={invite} />
                          ))}
                      </ul>

                      <div className="invites createGame">

                          <Button width="60%" onClick={() => createNewLobby()}>
                              Create Game
                          </Button>

                      </div>
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
