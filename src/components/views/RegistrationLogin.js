import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/RegistrationLogin.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import Header from "components/views/Header";

import {red} from "@mui/material/colors";

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
                      <div className="errors">
                          Username and Password combination is wrong.
                      </div>
                  );
              break;

              case 404:
                setErrorLogin(
                    <div className="errors">
                        This Username does not exist.
                    </div>
                );
                break;

              default:
                setErrorLogin(
                      <div className="errors">
                          Unexpected server error. Try again.
                      </div>
                  );
          }

        }
        else{
            setErrorLogin(
              <div className="errors">
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
                        <div className="errors">
                            A user with this username already exists.
                        </div>
                    );
                break;

                default:
                    setErrorRegister(
                        <div className="errors">
                            Unexpected server error. Try again.
                        </div>
                    );
            }

          }
          else{
            setErrorRegister(
                <div className="errors">
                    Unknown error. Try again later.
                </div>
            );
          }

      }
  };


  return (
      <div>
          <Header height="100"/>
          <BaseContainer className="base-container-ReLo">
              <div className="containerRegistrationLogin">
                  <div className="login">
                      <div className="content title">
                          Login
                      </div>
                      <FormField
                          label="Name:"
                          value={loginUsername}
                          onChange={un => setLoginUsername(un)}
                          text = "Enter username"
                      />
                      <FormField
                          label="Password:"
                          text = "Enter password"
                          value={loginPassword}
                          type= "password"
                          onChange={n => setLoginPassword(n)}
                          />
                      <div className="content button-container">
                          <Button
                              disabled={!loginUsername || !loginPassword}
                              width="60%"
                              onClick={() => doLogin()}
                          >
                              Login
                          </Button>
                      </div>
                      {errorLogin}
                  </div>
                  <div className="content lineverticalright"> </div>
                  <div className="content lineverticalleft"> </div>
                  <div className="registration">
                      <div className="content title">
                          Register
                      </div>
                      <FormField
                          label="Name:"
                          text = "New username"
                          value={registerUsername}
                          onChange={un => setRegisterUsername(un)}
                          
                      />
                      <FormField
                          label="Password:"
                          text = "New password"
                          value={registerPassword}
                          type= "password"
                          onChange={n => setRegisterPassword(n)}
                          inputProps={{ maxLength: 10 }}
                      />
                      <div className="content button-container">
                          <Button
                              disabled={!registerUsername || !registerPassword}
                              width="60%"
                              onClick={() => doRegister()}
                          >
                              Register
                          </Button>
                      </div>
                      {errorRegister}
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
