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

import React, { useEffect, useState } from 'react';
import 'styles/ui/AspectRatioChecker.scss';


const AspectRatioChecker = props =>
{
    const [okay, setOkay] = useState(false);

    function checkWindowSize()
    {
        let h = window.innerHeight;
        let w = window.innerWidth;

        let aspect = w / h;

        if(aspect < 1.3 || w < 1000 || h < 600)
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
                    <div className='img-div'>
                        <img src="/resources/logo_bright.svg"></img>
                    </div>
                    Please resize the window to a landscape format of at least 1000x600
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