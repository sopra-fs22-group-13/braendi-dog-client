import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { heartBeatCreator } from "helpers/heartBeatCreator";

export const GameGuard = props => {
  if (localStorage.getItem("token") && localStorage.getItem("lobbyId") && localStorage.getItem("gametoken")) {
    heartBeatCreator.setType("GAME");
    return props.children;
  }
  return <Redirect to="/lobby"/>;
};

GameGuard.propTypes = {
  children: PropTypes.node
};