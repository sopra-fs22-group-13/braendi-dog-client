import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

export const LobbyGuard = props => {
  if (localStorage.getItem("token") && localStorage.getItem("lobbyId")) {
    return props.children;
  }
  return <Redirect to="/menu"/>;
};

LobbyGuard.propTypes = {
  children: PropTypes.node
};