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