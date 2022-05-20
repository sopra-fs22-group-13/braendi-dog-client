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