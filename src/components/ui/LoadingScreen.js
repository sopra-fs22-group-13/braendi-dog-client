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
import { createTheme, width } from '@mui/system';
import { Spinner } from './Spinner';
import { LinearProgress } from '@mui/material';
import { ThemeProvider } from '@emotion/react';


const LoadingScreen = props =>
{
    const theme = createTheme({
        palette: {
          primary: {
            main: '#C7CB95',
            dark: "#C7CB95",
            light: "#C7CB95",
          },
        },
      });

    return (
        <div className='aspectratio-container'>
            <div>
                <div>
                    Loading View
                </div>
                <ThemeProvider theme={theme}>
                    <LinearProgress color='primary' style={{width: "50vw", color: "red"}}></LinearProgress>
                </ThemeProvider>
            </div>
        </div>
    );

}

export default LoadingScreen