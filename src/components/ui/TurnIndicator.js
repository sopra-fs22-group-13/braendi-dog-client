import Down from '@mui/icons-material/ArrowDropDown';
import Up from '@mui/icons-material/ArrowDropUp';
import Left from '@mui/icons-material/ArrowLeft';
import Right from '@mui/icons-material/ArrowRight';
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
                dict = {"BLUE": <Down style = {{color: "LightSkyBlue"}}/>, "GREEN": <Left style = {{color: "#81EE81"}}/>, "YELLOW": <Up style = {{color: "#F8EC79"}}/>, "RED": <Right style = {{color: "#E96464"}}/>};
                break;
           case "GREEN":
                dict = {"GREEN": <Down style = {{color: "#81EE81"}}/>, "YELLOW": <Left style = {{color: "#F8EC79"}}/>, "RED": <Up style = {{color: "#E96464"}}/>, "BLUE": <Right style = {{color: "LightSkyBlue"}}/>};
                break;
           case "YELLOW":
                dict = {"YELLOW": <Down style = {{color: "#F8EC79"}}/>, "RED": <Left style = {{color: "#E96464"}}/>, "BLUE": <Up style = {{color: "LightSkyBlue"}}/>, "GREEN": <Right style = {{color: "#81EE81"}}/>};
                break;
           case "RED":
                dict = {"RED": <Down style = {{color: "#E96464"}}/>, "BLUE": <Left style = {{color: "LightSkyBlue"}}/>, "GREEN": <Up style = {{color: "#81EE81"}}/>, "YELLOW": <Right style = {{color: "#F8EC79"}}/>};
                break;
           default:
                dict = {"GREEN": <Down style = {{color: "#81EE81"}}/>, "#F8EC79": <Left style = {{color: "#F8EC79"}}/>, "RED": <Up style = {{color: "#E96464"}}/>, "BLUE": <Right style = {{color: "LightSkyBlue"}}/>};
                break;
        }

        if(state === userColor)
        {
            //notification
            setTimeout(() => {addInfo("Your Turn!");}, 10);
        }

       let icon = dict[state];

    return (
        <div className='turn-indicator'>
            {icon}
        </div>
    )
}

export default TurnIndicator;
