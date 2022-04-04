import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Menu.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import Header from "components/views/Header";


/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */


const Invite = ({invite}) => (
    <div className="invites singleInvites">
        <div>
            {invite}
        </div>
        <div> {invite.name} </div>
        <div className="invites inviteButton" > Join </div>
    </div>
);

Invite.propTypes = {
    invite: PropTypes.object
};



const Menu = props => {
    const history = useHistory();
    const invites = ["dog1", "dog2"];

    //needs to recive all invites with token

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
                          <Button width="60%">
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

                          <Button width="60%">
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
