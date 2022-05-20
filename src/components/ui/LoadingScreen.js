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