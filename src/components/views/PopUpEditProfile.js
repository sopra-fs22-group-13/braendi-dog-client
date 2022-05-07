import React from "react";
import 'styles/views/Menu.scss';

const Popup = props => {
  return (
      <div className="popup popup-box">
        <div className="popup box">
          <span className="popup close-icon" onClick={props.handleClose}>x</span>
          {props.content}
        </div>
      </div>
  );
};

export default Popup;