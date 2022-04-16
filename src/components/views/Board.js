import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Board.scss";

import { getMarbleLocation } from 'helpers/getMarbleLocation';


const Board = props => {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);

useEffect(() => {

    //get the data
    //initial request
    const response = api.get(`/game/board/${localStorage.getItem("gametoken")}`, {
        headers: {
            'Authorization': "Basic " + localStorage.getItem("token")
            }
        });
        setData(response.data);

    //only add the listener on initial render, otherwise we have multiple
    document.addEventListener("boardUpdate", event => {
        const response = api.get(`/game/board/${localStorage.getItem("gametoken")}`, {
            headers: {
                'Authorization': "Basic " + localStorage.getItem("token")
            }
        });
        setData(response.data);
    });

    let fakeData = new Object();
    fakeData.board = ["NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN"];
    fakeData.redGoal = ["NONE", "NONE", "NONE", "RED"];
    fakeData.greenGoal = ["NONE", "NONE", "GREEN", "GREEN"];
    fakeData.blueGoal = ["NONE", "NONE", "NONE", "BLUE"];
    fakeData.yellowGoal = ["NONE", "NONE", "NONE", "NONE"];
    fakeData.redBase = 2;
    fakeData.greenBase = 1;
    fakeData.blueBase = 3;
    fakeData.yellowBase = 3;
    fakeData.lastPlayedCard = "2S";
    fakeData.colorMapping = {128: "RED", 12: "BLUE", 124: "YELLOW", 38: "GREEN"};
    setData(fakeData);
}, []);


  let background = <Spinner/>;
  let userColor = "BLUE";

  switch(userColor){
    case "BLUE":
        background =(
            <img src={process.env.PUBLIC_URL + '/resources/blue_4k_b_compressed_wide.jpg'} className="board bg-img"/>
        );
        break;
    case "GREEN":
        background =(
            <img src={process.env.PUBLIC_URL + '/resources/blue_4k_g_compressed_wide.jpg'} className="board bg-img"/>
        );
        break;
    case "RED":
        background =(
            <img src={process.env.PUBLIC_URL + '/resources/blue_4k_r_compressed_wide.jpg'} className="board bg-img"/>
        );
        break;
    case "YELLOW":
        background =(
           <img src={process.env.PUBLIC_URL + '/resources/blue_4k_y_compressed_wide.jpg'} className="board bg-img"/>
        );
        break;
  }


  return (
    <BaseContainer>
        {background}
    </BaseContainer>
  );
}

export default Board;
