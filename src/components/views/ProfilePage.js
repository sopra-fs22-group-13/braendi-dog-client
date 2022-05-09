import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/RegistrationLogin.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import user from "models/User";
import { addError } from './ErrorDisplay';

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

const ProfilePage = props => {
  const history = useHistory();
  const [user, setUser]= useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [status, setStatus] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [description, setDescription] = useState(null);
  const [wins, setWins] = useState(null);
  const [gotInGoals, setGotInGoals] = useState(null);


  const doMenu = async () => {
      // RegistrationLogin successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/game`);
  };

  const getData = async ()=>{
    try {
      const requestBody = JSON.stringify(localStorage.getItem('userID'));
      const response = await api.post('/users', requestBody);
      setUser( new User(response.data));

    }catch (error){
      addError("Error by fatching data")
    }

  }

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          {getData()}
          <FormField
            label={"Username" + user.username}
            value={username}
            onChange={un => setUsername(un)}
          />
          <FormField
            label={"Password" + user.password}
            value={password}
            onChange={n => setPassword(n)}
          />
          <FormField
              label={"Status" + user.status}
              value={status}
              onChange={un => setStatus(un)}
          />
          <FormField
              label={"Avatar" + user.avatar}
              value={avatar}
              onChange={n => setAvatar(n)}
          />
          <FormField
              label={"Description" + user.description}
              value={description}
              onChange={un => setUsername(un)}
          />
          <FormField
              label={"Wins" + user.wins}
              value={wins}
              onChange={n => setPassword(n)}
          />
          <FormField
              label={"gotInGoals"+ user.gotInGoals}
              value={gotInGoals}
              onChange={n => setPassword(n)}
          />
          <div className="login button-container">
            <Button
              disabled={!username || !password}
              width="100%"
              onClick={() => doMenu()}
            >
              Back
            </Button>
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
export default ProfilePage;
