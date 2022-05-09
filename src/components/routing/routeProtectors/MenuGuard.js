import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { heartBeatCreator } from "helpers/heartBeatCreator";


export const MenuGuard = props => {
  if (localStorage.getItem("token")) {
    heartBeatCreator.setType("MENU");
    return props.children;
  }

  return <Redirect to="/login"/>;
};

MenuGuard.propTypes = {
  children: PropTypes.node
};