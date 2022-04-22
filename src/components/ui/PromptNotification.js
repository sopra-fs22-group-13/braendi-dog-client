import 'styles/ui/PromptNotification.scss';
import PropTypes from "prop-types";

const PromptNotification = props => (
  <div {...props}>
    <label className={`notification label`}>{props.label}</label>
  </div>
);

PromptNotification.propTypes = {
  label: PropTypes.string,
};

export default PromptNotification;