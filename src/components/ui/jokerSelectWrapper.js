import React from 'react';
import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/ui/JokerSelectWrapper.scss';
import BaseContainer from "components/ui/BaseContainer";
import PetsIcon from '@mui/icons-material/Pets';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from "prop-types";
import { connectToPersonalUpdate } from 'helpers/updateManager';
import Hand from "components/ui/Hand";
import { moveManager } from 'helpers/moveManager';


const JokerSelectWrapper = props =>
{
    const [visible, setVisible] = useState(false);
    const [jokerSelectCallback, setJokerSelectCallback] = useState(null);

    useEffect(() => {
        let b = moveManager.registerCallback(hide, true, false, false, false);
        let a = moveManager.registerCallback(startWithPopup, false, false, false, true);

        return () => { // This code runs when component is unmounted
            moveManager.unregisterCallback(a);
            moveManager.unregisterCallback(b);
        }
    }, []);

    function cardSelectFunction(cardValue)
    {
        moveManager.selectCard(cardValue, true);
        jokerSelectCallback();
    }

    function hide()
    {
        setVisible(false);
        setJokerSelectCallback(null);
    }

    function startWithPopup(){
        let jokerCallback = moveManager.getJokerCallback();
        setJokerSelectCallback(() => () => {jokerCallback();});
        setVisible(true);
    }

    let handInfo = ["2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "AS", "JS", "QS", "KS"];

    //format info
    let formattedMe = [];
    handInfo.forEach(cardstring => {
        formattedMe.push({cardValue: cardstring, faceDown: false, selectable: true, selectFunction: cardSelectFunction});
    });

    return (
        <div className='jokerselectwrapper-container'>
            {visible ?
                <Hand playerCards={formattedMe} ></Hand>
                : null}
        </div>
    );


}

export default JokerSelectWrapper