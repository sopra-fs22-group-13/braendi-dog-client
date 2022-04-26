import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";


export const MenuGuard = props => {
  if (localStorage.getItem("token")) {
    return props.children;
  }
  return <Redirect to="/login"/>;
};

MenuGuard.propTypes = {
  children: PropTypes.node
};