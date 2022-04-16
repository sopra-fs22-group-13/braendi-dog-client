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
        info = [
            {
                cardValue: "Joker",
                faceDown: false,
            },
            {
                cardValue: "2C",
                faceDown: false,
            },
            {
                cardValue: "3C",
                faceDown: true,
            },
            {
                cardValue: "4C",
                faceDown: false,
            },
            {
                cardValue: "5S",
                faceDown: false,
            }
        ];
        setHandInfo(info)

    }, []);

    if(handInfo != null)
    {
        return (
            <div className='handwrapper-container'>
                <Hand playerCards={handInfo} ></Hand>
                <Hand playerCards={handInfo} ></Hand>
                <Hand playerCards={handInfo} ></Hand>
                <Hand playerCards={handInfo} ></Hand>
            </div>
        );
    }

    return(
        <div>
        </div>
    );

}

export default HandsWrapper