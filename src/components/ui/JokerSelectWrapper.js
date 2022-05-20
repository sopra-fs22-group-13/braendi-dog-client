import Hand from "components/ui/Hand";
import { moveManager } from 'helpers/moveManager';
import React, { useEffect, useState } from 'react';
import 'styles/ui/JokerSelectWrapper.scss';


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
        formattedMe.push({cardValue: cardstring, faceDown: false, selectable: true, selectFunction: cardSelectFunction, small: true});
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