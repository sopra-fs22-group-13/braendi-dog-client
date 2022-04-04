import 'styles/ui/PromptNotification.scss';
import PropTypes from "prop-types";

const PromptNotification = props => (
  <div {...props} className={`notification ${props.className ?? ''}`}>
    <label className={`notification label ${props.className ?? ''}`}>{props.label}</label>
  </div>
);

PromptNotification.propTypes = {
  label: PropTypes.string,
};

export default PromptNotification;