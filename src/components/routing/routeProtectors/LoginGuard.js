import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { heartBeatCreator } from "helpers/heartBeatCreator";


export const LoginGuard = props => {
  if (!localStorage.getItem("token")) {
    heartBeatCreator.killHeartBeat();
    return props.children;
  }
  // if user is already logged in, redirects to the main /app
  return <Redirect to="/menu"/>;
};

LoginGuard.propTypes = {
  children: PropTypes.node
}