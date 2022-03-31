import React from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/ui/Lobby.scss';
import BaseContainer from "components/ui/BaseContainer";
import SideBarContainer from "components/ui/SideBarContainer";
import { DogPawLogo } from "components/ui/DogPawLogo";
import { LogoutButton } from "components/ui/LogoutButton";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const SideBarField = props => {
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

SideBarField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const Login = props => {
  const history = useHistory();

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
          <div className="lobby circle-container">
              <div className="lobby circle">
              <DogPawLogo width="70px" height="70px"/>
              </div>
              <div className="lobby circle">
              <DogPawLogo width="70px" height="70px"/>
              </div>
          </div>
          <div className="lobby circle-container">
              <div className="lobby circle">
              <DogPawLogo width="70px" height="70px"/>
              </div>
              <div className="lobby circle">
              <DogPawLogo width="70px" height="70px"/>
              </div>
          </div>
        </div>
        <div className="search container">
            <div className="search searchbox">
            </div>
        </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;
