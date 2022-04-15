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
        //only add the listener on initial render, otherwise we have multiple
        document.addEventListener("cardUpdate", event => {
            const response = api.get(`/game/players/${localStorage.getItem("token")}`);
            setHandInfo(response.data);
        });

        let info = new Object();
        info.visibleCards = ["2S", "4S", "5S"];
        info.hiddenCardCount = [3, 4, 5];
        setHandInfo(info)

    }, []);

    if(handInfo != null)
    {
        return (
            <div className='handwrapper-container'>
                <Hand playerCards={handInfo.visibleCards} ></Hand>
            </div>
        );
    }

    return(
        <div>
            HandInfo was null
        </div>
    );

}

export default HandsWrapper