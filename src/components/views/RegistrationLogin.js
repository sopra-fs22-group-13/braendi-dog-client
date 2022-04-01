import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/RegistrationLogin.scss';
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

const RegistrationLogin = props => {
  var password;
  var username;
  const history = useHistory();
  const [loginPassword, setLoginPassword] = useState(null);
  const [loginUsername, setLoginUsername] = useState(null);
  const [registerPassword, setRegisterPassword] = useState(null);
  const [registerUsername, setRegisterUsername] = useState(null);

  const doLogin = async () => {
      try {
          password= loginPassword;
          username = loginUsername;
          const requestBody = JSON.stringify({username, password});
          const response = await api.post('/login/users', requestBody);

          // Get the returned user and update a new object.
          const user = new User(response.data);

          // Store the token into the local storage.
          localStorage.setItem('token', user.token);

          // RegistrationLogin successfully worked --> navigate to the route /game in the GameRouter
          history.push(`/menu`);
      } catch (error) {
          alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
  };

  const doRegister = async () => {
      try {
          password= registerPassword;
          username = registerUsername;
          const requestBody = JSON.stringify({username, password});
          const response = await api.post('/login', requestBody);

          // Get the returned user and update a new object.
          const user = new User(response.data);

          // Store the token into the local storage.
          localStorage.setItem('token', user.token);

          // RegistrationLogin successfully worked --> navigate to the route /game in the GameRouter
          history.push(`/menu`);
      } catch (error) {
          alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
  };


  return (

    <BaseContainer>
      <div className="login container">

          <div className="login formLogin">
            <div className="login title">
                Login
            </div>
          <FormField
            label="Name:"
            text = "Login Name"
            value={loginUsername}
            onChange={un => setLoginUsername(un)}
          />
          <FormField
            label="Password:"
            text = "Login Password"
            value={loginPassword}
            width="50%"
            onChange={n => setLoginPassword(n)}
          />
          <div className="login button-container">
            <Button
              disabled={!loginUsername || !loginPassword}
              width="60%"
              onClick={() => doLogin()}
            >
              Login
            </Button>
          </div>
        </div>

        <div className="login space"></div>
        <div className="login linevertical"> </div>
          <div className="login formRegister">
           <div className="login title">
             Register
           </div>
          <FormField
            label="Name:"
            text = "Register Password"
            value={registerUsername}
            onChange={un => setRegisterUsername(un)}
          />
          <FormField
            label="Password:"
            text = "Register Password"
            value={registerPassword}
            onChange={n => setRegisterPassword(n)}
          />
          <div className="login button-container">
            <Button
              disabled={!registerUsername || !registerPassword}
              width="60%"
              onClick={() => doRegister()}
            >
              Register
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
export default RegistrationLogin;
