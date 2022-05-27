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