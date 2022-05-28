/*
    dog-client is the client component of an online web implementation of dog.
    Copyright (C) 2022  Luca Zwahlen

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

import { ThemeProvider } from '@emotion/react';
import { LinearProgress } from '@mui/material';
import { createTheme } from '@mui/system';
import React from 'react';
import 'styles/ui/AspectRatioChecker.scss';


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
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div className='img-div'>
                    <img src="/resources/logo_bright.svg"></img><br></br>
                </div>
                <div>
                    Loading View
                </div>
                <div>
                </div>
                <ThemeProvider theme={theme}>
                    <LinearProgress color='primary' style={{width: "50vw", color: "red"}}></LinearProgress>
                </ThemeProvider>
            </div>
        </div>
    );

}

export default LoadingScreen