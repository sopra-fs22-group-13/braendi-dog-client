import React, {useEffect, useState } from "react";
import PropTypes from "prop-types";
import "styles/views/ErrorDisplay.scss";
import PetsIcon from '@mui/icons-material/Pets';
import random from "sockjs-client/lib/utils/random";

const Error = props => {

    const [active, setActive] = useState(false);

    let styles = {
        animationDelay: '0s, ' + (props.time - 300) + "ms", //inline styling to be able to customize the delay.
    };

    useEffect(() => {
        setActive(true);
        setTimeout(() => {
            setActive(false);
        }, props.time); //disable after time is up
    }, []);

    let content = (
        <div style={styles}>
            <div className="error-indicator">
                <PetsIcon/>
                ERROR:
                <PetsIcon/>
            </div>
            <div>{props.text}</div>
        </div>
    );

    return active? content : "";
}

Error.propTypes = {
    text: PropTypes.string,
    time: PropTypes.number
};

const ErrorDisplay = props => {

    //const [errors, setErrors] = useState([{text: "errortext", time: 10000}]);

    const [errors, setErrors] = useState([]);
    const [rdm, setRdm] = useState(null);

    const update = (event) => {        
        errors.push({text: event.detail.text, time: event.detail.time});
        setRdm(Math.random());
        let obj = errors[errors.length-1];
        const interval = setInterval(function () {
            let idx = errors.indexOf(obj);
            errors[idx].time = errors[idx].time - 300;
        }, 300);
        setTimeout(() => {
            let idx = errors.indexOf(obj);
            errors.splice(idx, 1);
            clearInterval(interval);
        }, event.detail.time); //disable after time is up

    }

    useEffect(() => {
        document.addEventListener("errorUpdate", update);
    }, []);

    return (    
        <div className="error-display" id="error-display">
            {errors.map(error => (
                <Error text={error.text} time={error.time} key={Math.random()}/>
                ))
            }
        </div>
    );

}

export function addError(text, time = 10000)
{
    let r = (Math.random() + 1).toString(36).substring(7);
    const event = new CustomEvent('errorUpdate', { detail: {text: text + r, time: time}});
    document.dispatchEvent(event);
}

export default ErrorDisplay;