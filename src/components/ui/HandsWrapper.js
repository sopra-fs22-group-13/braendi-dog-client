import React from 'react';
import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/ui/HandsWrapper.scss';
import BaseContainer from "components/ui/BaseContainer";
import SideBarContainer from "components/ui/SideBarContainer";
import PetsIcon from '@mui/icons-material/Pets';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from "prop-types";

import { startListening } from 'components/voice/voiceChat';
import { connectToPersonalUpdate } from 'helpers/updateManager';
import Hand from "components/ui/Hand";


const HandsWrapper = props =>
{
    const [handInfo, setHandInfo] = useState(null);

    //hand update listener
    useEffect(() => {
        //initial request
        const response = api.get(`/game/players/${localStorage.getItem("token")}`, {
            headers: {
                'Authorization': "Basic " + localStorage.getItem("token")
                }
            });
        setHandInfo(response.data);

        //only add the listener on initial render, otherwise we have multiple
        document.addEventListener("cardUpdate", event => {
            const response = api.get(`/game/players/${localStorage.getItem("token")}`, {
                headers: {
                    'Authorization': "Basic " + localStorage.getItem("token")
                }
            });
            setHandInfo(response.data);
        });

        //fakeInfo
        let info = new Object();
        info.visibleCards = ["2S", "4S", "5S", "4D" ,"JD", "AD"];
        info.hiddenCardCount = [6,3,4];
        setHandInfo(info)

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