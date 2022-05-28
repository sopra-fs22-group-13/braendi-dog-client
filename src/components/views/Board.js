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

import BaseContainer from "components/ui/BaseContainer";
import { Spinner } from 'components/ui/Spinner';
import { api } from 'helpers/api';
import { useEffect, useState } from 'react';
import "styles/views/Board.scss";



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
