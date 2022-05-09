import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { heartBeatCreator } from "helpers/heartBeatCreator";

export const LobbyGuard = props => {
  if (localStorage.getItem("token") && localStorage.getItem("lobbyId")) {
    heartBeatCreator.setType("LOBBY");
    return props.children;
  }
  return <Redirect to="/menu"/>;
};

LobbyGuard.propTypes = {
  children: PropTypes.node
};