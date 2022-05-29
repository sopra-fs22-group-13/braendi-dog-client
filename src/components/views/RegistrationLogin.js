/*
    dog-client is the client component of an online web implementation of dog.
    Copyright (C) 2022  Luca Zwahlen, Simona Borghi, Sandro Vonlanthen, Anton Crazzolara, Shitao Zeng

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import BaseContainer from "components/ui/BaseContainer";
import { Button } from 'components/ui/Button';
import Header from "components/views/Header";
import { api } from 'helpers/api';
import PropTypes from "prop-types";
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'styles/views/RegistrationLogin.scss';


/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
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
        type={props.type}
        maxLength={props.maxLength}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  maxLength: PropTypes.func
};

const RegistrationLogin = props => {
  var password;
  var username;
  const history = useHistory();
  const [loginPassword, setLoginPassword] = useState(null);
  const [loginUsername, setLoginUsername] = useState(null);
  const [registerPassword, setRegisterPassword] = useState(null);
  const [registerUsername, setRegisterUsername] = useState(null);

  const [errorRegister, setErrorRegister] = useState(null);
  const [errorLogin,setErrorLogin] = useState(null)

  const doLogin = async () => {
      try {

          password= loginPassword;
          username = loginUsername;
          const requestBody = JSON.stringify({username, password});
          const response = await api.post('/login', requestBody);

          const auth= response.headers.authorization;
          localStorage.setItem('token', auth.substring(6));
          localStorage.setItem('userID', response.data.id);
          localStorage.setItem('userName',response.data.username);

          history.push(`/menu`);

      } catch (error) {
        if(error.response && error.response.status != null)
        {
          switch(error.response.status)
          {
              case 401:
                  setErrorLogin(
                      <div className="relo-errors">
                          Username and Password combination is wrong.
                      </div>
                  );
              break;

              case 404:
                setErrorLogin(
                    <div className="relo-errors">
                        This Username does not exist.
                    </div>
                );
                break;

              default:
                setErrorLogin(
                      <div className="relo-errors">
                          Unexpected server error. Try again.
                      </div>
                  );
          }

        }
        else{
            setErrorLogin(
              <div className="relo-errors">
                  Unknown error. Try again later.
              </div>
          );
        }
      }
  };

  const doRegister = async () => {
      try {

          password= registerPassword;
          username = registerUsername;
          const requestBody = JSON.stringify({username, password});
          const response = await api.post('/users', requestBody);

          const auth= response.headers.authorization;
          localStorage.setItem('token', auth.substring(6));
          localStorage.setItem('userID', response.data.id);
          localStorage.setItem('userName',response.data.username);

          history.push(`/menu`);

      } catch (error) {
          if(error.response && error.response.status != null)
          {
            switch(error.response.status)
            {
                case 409:
                    setErrorRegister(
                        <div className="relo-errors">
                            A user with this username already exists.
                        </div>
                    );
                break;

                case 405:
                    setErrorRegister(
                        <div className="relo-errors">
                            User name to short or to long
                        </div>
                    );
                break;

                default:
                    setErrorRegister(
                        <div className="relo-errors">
                            Unexpected server error. Try again.
                        </div>
                    );
            }

          }
          else{
            setErrorRegister(
                <div className="relo-errors">
                    Unknown error. Try again later.
                </div>
            );
          }

      }
  };


  return (
      <div className="login-background">
          <Header/>
          <BaseContainer className="base-container-ReLo">
              <div className="containerRegistrationLogin">
                  <div className="login">
                      <div className="content title">
                          Login
                      </div>
                      <FormField
                          label="Name:"
                          value={loginUsername}
                          maxLength={"10"}
                          onChange={un => setLoginUsername(un)}
                          text = "Enter username"
                      />
                      <FormField
                          label="Password:"
                          text = "Enter password"
                          maxLength={"20"}
                          value={loginPassword}
                          type= "password"
                          onChange={n => setLoginPassword(n)}
                          />
                      {errorLogin}
                      <Button className="content button-container"
                          disabled={!loginUsername || !loginPassword}
                          width="60%"
                          onClick={() => doLogin()}
                      >
                          Login
                      </Button>

                  </div>

                  <div className="registration">
                      <div className="content title">
                          Register
                      </div>
                      <FormField
                          label="Name:"
                          text = "New username"
                          maxLength={"10"}
                          value={registerUsername}
                          onChange={un => setRegisterUsername(un)}

                          
                      />
                      <FormField
                          label="Password:"
                          text = "New password"
                          maxLength={"20"}
                          value={registerPassword}
                          type= "password"
                          onChange={n => setRegisterPassword(n)}
                      />
                      {errorRegister}
                      <Button className="content button-container"
                          disabled={!registerUsername || !registerPassword}
                          width="60%"
                          onClick={() => doRegister()}
                      >
                          Register
                      </Button>
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
export default RegistrationLogin;
