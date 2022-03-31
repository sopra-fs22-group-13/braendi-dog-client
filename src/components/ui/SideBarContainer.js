import 'styles/ui/SideBarContainer.scss';
import PropTypes from "prop-types";

const SideBarContainer = props => (
  <div {...props} className={`side-bar-container ${props.className ?? ''}`}>
    {props.children}
  </div>
);

SideBarContainer.propTypes = {
  children: PropTypes.node,
};

export default SideBarContainer;