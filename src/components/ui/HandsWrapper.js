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
import { api } from 'helpers/api';
import { moveManager } from 'helpers/moveManager';
import React, { useEffect, useState } from 'react';
import 'styles/ui/HandsWrapper.scss';


const HandsWrapper = props =>
{
    const [handInfo, setHandInfo] = useState(null);

    //hand update listener
    useEffect(() => {

        //fakeInfo
        let info = new Object();
        info.visibleCards = ["2S", "4S", "Joker", "4D" ,"JD", "AD"];
        info.hiddenCardCount = [6,3,4];
        setHandInfo(info);

        async function cardUpdateListener()
        {
            const response = await api.get(`/game/${localStorage.getItem("gametoken")}/players`, {
                headers: {
                    'Authorization': "Basic " + localStorage.getItem("token")
                }
            });
            setHandInfo(response.data);
        }

        //initial request
        cardUpdateListener();

        //only add the listener on initial render, otherwise we have multiple
        document.addEventListener("cardUpdate", cardUpdateListener);

        return () => { // This code runs when component is unmounted
            document.removeEventListener("cardUpdate", cardUpdateListener);
        }

    }, []);

    function cardSelectFunction(cardValue, selectThisCardFunction)
    {
        moveManager.selectCard(cardValue);
    }
    function jokerSelectFunction(cardValue, selectThisCardFunction)
    {
        moveManager.selectCard("");
        moveManager.selectJoker(selectThisCardFunction);
    }

    if(handInfo != null)
    {
        //format info
        let formattedMe = [];
        handInfo.visibleCards.forEach(cardstring => {
            if(cardstring == "Joker")
            {
                formattedMe.push({cardValue: cardstring, faceDown: false, selectable: true, selectFunction: jokerSelectFunction});

            }else{
                formattedMe.push({cardValue: cardstring, faceDown: false, selectable: true, selectFunction: cardSelectFunction});
            }
        });
        //other
        let formattedRest = [];
        handInfo.hiddenCardCount.forEach(count => {
            let arr = [];
            for (let index = 0; index < count; index++) {
                arr.push({cardValue: "2S", faceDown: true});
            }
            formattedRest.push(arr);
        });

        return (
            <div className='handwrapper-container'>
                <Hand playerCards={formattedMe} ></Hand>
                <Hand playerCards={formattedRest[0]} ></Hand>
                <Hand playerCards={formattedRest[1]} ></Hand>
                <Hand playerCards={formattedRest[2]} ></Hand>
            </div>
        );
    }

    return(
        <div>
        </div>
    );

}

export default HandsWrapper