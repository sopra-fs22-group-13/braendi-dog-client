/*
    dog-client is the client component of an online web implementation of dog.
    Copyright (C) 2022  Luca Zwahlen, Simona Borghi, Sandro Vonlanthen, Anton Crazzolara, Shitao Zeng

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "styles/views/ErrorDisplay.scss";

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

    let icon = null;
    let title = null;
    switch(props.type)
    {
        case "ERROR":
            icon = <ErrorIcon></ErrorIcon>;
            title = "Error"
            break;
        case "INFO":
            icon = <InfoIcon></InfoIcon>;
            title = "Information"
            break;
        case "SUCCESS":
            icon = <CheckCircleIcon></CheckCircleIcon>;
            title = "Success"
            break;
    }

    let content = (
        <div style={styles} className={props.type}>
            <div className="message-indicator">
                {icon}
                {title}:
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