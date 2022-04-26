import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

export const GameGuard = props => {
  if (localStorage.getItem("token") && localStorage.getItem("lobbyId") && localStorage.getItem("gametoken")) {
    return props.children;
  }
  return <Redirect to="/lobby"/>;
};

GameGuard.propTypes = {
  children: PropTypes.node
};