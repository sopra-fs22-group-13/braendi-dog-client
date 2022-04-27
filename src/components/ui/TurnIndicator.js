import Down from '@mui/icons-material/ArrowCircleDownOutlined';
import Up from '@mui/icons-material/ArrowCircleUpOutlined';
import Left from '@mui/icons-material/ArrowCircleLeftOutlined';
import Right from '@mui/icons-material/ArrowCircleRightOutlined';
import {api, handleError} from 'helpers/api';
import { useEffect, useState } from 'react';
import { HelpOutline } from '@mui/icons-material';
import 'styles/ui/TurnIndicator.scss';
import { addInfo } from 'components/views/ErrorDisplay';


const TurnIndicator = (props) => {
    const [state, setState] = useState("GREEN");
    const [data, setData] = useState(null);
    useEffect(() => {

        function turnUpdateListener(event)
        {
            setState(event.detail.turn);
        }
        //only add the listener on initial render, otherwise we have multiple
        document.addEventListener("turnUpdate", turnUpdateListener);


        const response = api.get(`/game/${localStorage.getItem("gametoken")}/board`, {
        headers: {
            'Authorization': "Basic " + localStorage.getItem("token")
            }
        });

        response.then((result) => {
          let newData = JSON.parse(JSON.stringify(result.data));
          setData(newData);
        });


        return () => { // This code runs when component is unmounted
            document.removeEventListener("turnUpdate", turnUpdateListener);
        }

    }, []);

        let userColor;
        let dict = new Object();
        if (data != null){userColor = data.colorMapping[localStorage.getItem("userID")];}

        switch(userColor){
            case "BLUE":
                dict = {"BLUE": <Down/>, "GREEN": <Left/>, "YELLOW": <Up/>, "RED": <Right/>};
                break;
           case "GREEN":
                dict = {"GREEN": <Down/>, "YELLOW": <Left/>, "RED": <Up/>, "BLUE": <Right/>};
                break;
           case "YELLOW":
                dict = {"YELLOW": <Down/>, "RED": <Left/>, "BLUE": <Up/>, "GREEN": <Right/>};
                break;
           case "RED":
                dict = {"RED": <Down/>, "BLUE": <Left/>, "GREEN": <Up/>, "YELLOW": <Right/>};
                break;
           default:
                dict = {"GREEN": <Down/>, "YELLOW": <Left/>, "RED": <Up/>, "BLUE": <Right/>};
                break;
        }

        if(state === userColor)
        {
            //notification
            addInfo("Your Turn!");
        }

       let icon = dict[state];

    return (
        <div className='turn-indicator'>
            {icon}
        </div>
    )
}

export default TurnIndicator;
