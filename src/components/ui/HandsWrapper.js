import React from 'react';
import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/ui/HandsWrapper.scss';
import BaseContainer from "components/ui/BaseContainer";
import PetsIcon from '@mui/icons-material/Pets';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from "prop-types";
import { connectToPersonalUpdate } from 'helpers/updateManager';
import Hand from "components/ui/Hand";


const HandsWrapper = props =>
{
    const [handInfo, setHandInfo] = useState(null);

    //hand update listener
    useEffect(() => {

        //fakeInfo
        let info = new Object();
        info.visibleCards = ["2S", "4S", "5S", "4D" ,"JD", "AD"];
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

    if(handInfo != null)
    {
        //format info
        let formattedMe = [];
        handInfo.visibleCards.forEach(cardstring => {
            formattedMe.push({cardValue: cardstring, faceDown: false});
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