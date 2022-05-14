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
    const response = api.get(`/game/${localStorage.getItem("gametoken")}/board`, {
        headers: {
            'Authorization': "Basic " + localStorage.getItem("token")
            }
        });

        response.then((result) => {
            let newData = JSON.parse(JSON.stringify(result.data));
            setData(newData);
        });

}, []);


  let background = <Spinner/>;
  let userColor;
  if (data != null){userColor = data.colorMapping[localStorage.getItem("userID")];}


// sets background based on playerColor
  switch(userColor){
    case "BLUE":
        background =(
            <img src={process.env.PUBLIC_URL + '/resources/green_4k_b.jpg'} className="board bg-img"/>
        );
        break;
    case "GREEN":
        background =(
            <img src={process.env.PUBLIC_URL + '/resources/green_4k_g.jpg'} className="board bg-img"/>
        );
        break;
    case "RED":
        background =(
            <img src={process.env.PUBLIC_URL + '/resources/green_4k_r.jpg'} className="board bg-img"/>
        );
        break;
    case "YELLOW":
        background =(
           <img src={process.env.PUBLIC_URL + '/resources/green_4k_y.jpg'} className="board bg-img"/>
        );
        break;

    default:
        background =(
            <img src={process.env.PUBLIC_URL + '/resources/green_4k_b.jpg'} className="board bg-img"/>
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
