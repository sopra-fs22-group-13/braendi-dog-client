import React, {useEffect, useState } from "react";
import PropTypes from "prop-types";
import "styles/views/ErrorDisplay.scss";
import PetsIcon from '@mui/icons-material/Pets';
import random from "sockjs-client/lib/utils/random";

const Message = props => {

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
        <div style={styles} className={props.type}>
            <div className="message-indicator">
                <PetsIcon/>
                {props.type}:
                <PetsIcon/>
            </div>
            <div>{props.text}</div>
        </div>
    );

    return active? content : "";
}

Message.propTypes = {
    text: PropTypes.string,
    time: PropTypes.number
};

const ErrorDisplay = props => {


    const [messages, setErrors] = useState([]);
    const [rdm, setRdm] = useState(null);

    const update = (event) => {        
        messages.push({text: event.detail.text, time: event.detail.time, type: event.detail.type});
        setRdm(Math.random());
        let obj = messages[messages.length-1];
        const interval = setInterval(function () {
            let idx = messages.indexOf(obj);
            messages[idx].time = messages[idx].time - 300;
        }, 300);
        setTimeout(() => {
            let idx = messages.indexOf(obj);
            messages.splice(idx, 1);
            clearInterval(interval);
        }, event.detail.time); //disable after time is up

    }

    useEffect(() => {
        document.addEventListener("errorUpdate", update);

        return () => { // This code runs when component is unmounted
            document.removeEventListener("errorUpdate", update);
        }
    }, []);

    return (    
        <div className="error-display" id="error-display">
            {messages.map(message => {
                switch(message.type){
                    case "ERROR":
                        return (
                            <Message text={message.text} time={message.time} type={message.type} key={Math.random()}/>
                        );
                    case "INFO":
                        return (
                            <Message text={message.text} time={message.time} type={message.type} key={Math.random()}/>
                        );
                    case "SUCCESS":
                        return (
                            <Message text={message.text} time={message.time} type={message.type} key={Math.random()}/>
                        );
                    default:
                        return (
                            <Message text={message.text} time={message.time} type={"ERROR"} key={Math.random()}/>
                        );
                }
            })
            }
        </div>
    );

}

export function addError(text, time = 5000)
{
    const event = new CustomEvent('errorUpdate', { detail: {text: text, time: time, type: "ERROR"}});
    document.dispatchEvent(event);
}

export function addInfo(text, time = 5000)
{
    const event = new CustomEvent('errorUpdate', { detail: {text: text, time: time, type: "INFO"}});
    document.dispatchEvent(event);
}

export function addSuccess(text, time = 5000)
{
    const event = new CustomEvent('errorUpdate', { detail: {text: text, time: time, type: "SUCCESS"}});
    document.dispatchEvent(event);
}

export default ErrorDisplay;