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

import Down from '@mui/icons-material/ArrowDropDown';
import Up from '@mui/icons-material/ArrowDropUp';
import Left from '@mui/icons-material/ArrowLeft';
import Right from '@mui/icons-material/ArrowRight';
import { addInfo } from 'components/views/ErrorDisplay';
import { api } from 'helpers/api';
import { useEffect, useState } from 'react';
import 'styles/ui/TurnIndicator.scss';


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
            setTimeout(() => {addInfo("Your Turn!");}, 8);
        }

       let icon = dict[state];

    return (
        <div className='turn-indicator'>
            {icon}
        </div>
    )
}

export default TurnIndicator;
