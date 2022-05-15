import React from 'react';
import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/ui/AspectRatioChecker.scss';
import BaseContainer from "components/ui/BaseContainer";
import PetsIcon from '@mui/icons-material/Pets';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from "prop-types";
import { connectToPersonalUpdate } from 'helpers/updateManager';
import Hand from "components/ui/Hand";
import { moveManager } from 'helpers/moveManager';
import { width } from '@mui/system';


const AspectRatioChecker = props =>
{
    const [okay, setOkay] = useState(false);

    function checkWindowSize()
    {
        let h = window.innerHeight;
        let w = window.innerWidth;

        let aspect = w / h;

        if(aspect < 1.25)
        {
            setOkay(false);
        }else{
            setOkay(true);
        }

    }

    useEffect(() => {

        checkWindowSize();
        window.addEventListener('resize', checkWindowSize);

        return () => { // This code runs when component is unmounted
            window.removeEventListener("resize", checkWindowSize);
        }

    }, []);


    if(!okay)
    {
        return (
            <div className='aspectratio-container'>
                <div>
                    Please resize the window to at least 5:4 in landscape
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>

        </React.Fragment>
    );


}

export default AspectRatioChecker