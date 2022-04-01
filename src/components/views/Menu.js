import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Menu.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";


/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = props => {
  return (
    <div className="login field">
      <label className="login label">
        {props.label}
      </label>
      <input
        className="login input"
        placeholder="enter here.."
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

const Menu = props => {
  const history = useHistory();


  return (

      <BaseContainer>
        <div SideBarContainer className="menu container">
           <div className="menu userInfo">
               <div className="menu fotoContainer" >
                   <div className="menu foto">
                   foto
                   </div>
               </div>
              <div className="menu infoContainer">
                  <div className="menu nickName">
                      NickName
                  </div>
                 <div className="menu singleInfo">
                    Name:
                 </div>
                 <div className="menu singleInfo">
                     Birthday:
                 </div>
                 <div className="menu singleInfo">
                    Wins:
                 </div>
                 <div className="menu singleInfo">
                    More Stats:
                 </div>
              </div>

              <div className="menu button-container">
                <Button width="60%" >
                  Edit
                </Button>
                <div className="menu spaceUp"> </div>
                <Button width="60%">
                   Logout
                </Button>
              </div>
          </div>
          <div className="menu spaceRight"></div>
          <div className="menu linevertical"> </div>
          <div className="menu invites">
              <div className="menu titleInvites">
                  Invites
              </div>
              <div className="menu spaceUp"></div>
              <div className="menu singleInvites">
                  <div>
                      Dog1
                  </div>

                  <div className="menu inviteButton" >
                       Join
                  </div>
              </div>
              <div className="menu createGame">

              </div>
          </div>
        </div>
      </BaseContainer>

  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Menu;
