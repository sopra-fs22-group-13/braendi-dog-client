import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import Marble from "components/ui/Marble";
import PropTypes from "prop-types";
import "styles/views/Marbles.scss";

import { getMarbleLocation } from 'helpers/getMarbleLocation';

//Marbles component (layer of all marbles)
const Marbles = props => {
  const [data, setData] = useState(null);

useEffect(() => {

    //get the data for marble layout
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

    //mock data
    let fakeData = new Object();
    fakeData.board = ["RED", "NONE", "NONE", "NONE", "NONE", "NONE", "RED", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "BLUE", "NONE", "NONE", "BLUE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "YELLOW", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "YELLOW", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE"];
    fakeData.redGoal = ["NONE", "NONE", "NONE", "RED"];
    fakeData.greenGoal = ["NONE", "NONE", "GREEN", "GREEN"];
    fakeData.blueGoal = ["NONE", "NONE", "NONE", "BLUE"];
    fakeData.yellowGoal = ["NONE", "YELLOW", "NONE", "NONE"];
    fakeData.redBase = 2;
    fakeData.greenBase = 1;
    fakeData.blueBase = 3;
    fakeData.yellowBase = 3;
    fakeData.lastPlayedCard = "2S";
    fakeData.colorMapping = {128: "RED", 12: "BLUE", 124: "YELLOW", 38: "GREEN"};
    setData(fakeData);
}, []);

//variables to adapt to player (color) perspective
let boardIdx, blueB, blueG, redB, redG, yellowB, yellowG, greenB, greenG;
let userColor;

//implementation for when localStorage has userColor stored: userColor = data.colorMapping[localStorage.getItem('userColor')]} -> TODO registration/ login
  if (data != null){userColor = data.colorMapping[12];}


//set perspective variables, ['where', 'img_path'] and the {int} board offset
switch(userColor){
    case "BLUE":
        blueB = ['bl_base', '/resources/marble_b_light.png'];
        blueG = ['bl_goal', '/resources/marble_b_light.png'];
        redB = ['br_base', '/resources/marble_r_light.png'];
        redG = ['br_goal', '/resources/marble_r_light.png'];
        yellowB = ['tr_base', '/resources/marble_y_light.png'];
        yellowG = ['tr_goal', '/resources/marble_y_light.png'];
        greenB = ['tl_base', '/resources/marble_g_light.png'];
        greenG = ['tl_goal', '/resources/marble_g_light.png'];
        boardIdx = 16;
        break;

    case "RED":
        blueB = ['tl_base', '/resources/marble_b_light.png'];
        blueG = ['tl_goal', '/resources/marble_b_light.png'];
        redB = ['bl_base', '/resources/marble_r_light.png'];
        redG = ['bl_goal', '/resources/marble_r_light.png'];
        yellowB = ['br_base', '/resources/marble_y_light.png'];
        yellowG = ['br_goal', '/resources/marble_y_light.png'];
        greenB = ['tr_base', '/resources/marble_g_light.png'];
        greenG = ['tr_goal', '/resources/marble_g_light.png'];
        boardIdx = 0;
        break;

    case "YELLOW":
        blueB = ['tr_base', '/resources/marble_b_light.png'];
        blueG = ['tr_goal', '/resources/marble_b_light.png'];
        redB = ['tl_base', '/resources/marble_r_light.png'];
        redG = ['tl_goal', '/resources/marble_r_light.png'];
        yellowB = ['bl_base', '/resources/marble_y_light.png'];
        yellowG = ['bl_goal', '/resources/marble_y_light.png'];
        greenB = ['br_base', '/resources/marble_g_light.png'];
        greenG = ['br_goal', '/resources/marble_g_light.png'];
        boardIdx = 48;
        break;

    case "GREEN":
        blueB = ['br_base', '/resources/marble_b_light.png'];
        blueG = ['br_goal', '/resources/marble_b_light.png'];
        redB = ['tr_base', '/resources/marble_r_light.png'];
        redG = ['tr_goal', '/resources/marble_r_light.png'];
        yellowB = ['tl_base', '/resources/marble_y_light.png'];
        yellowG = ['tl_goal', '/resources/marble_y_light.png'];
        greenB = ['bl_base', '/resources/marble_g_light.png'];
        greenG = ['bl_goal', '/resources/marble_g_light.png'];
        boardIdx = 32;
        break;
}

/*
    * Creates all Base Marbles
    * @param {int} counts -> nr of marbles in base
    * @param {array['where', 'img_path]} marbleData -> marble characteristics = perspective variables
*/
  const createBaseMarbles = (counts, marbleData) => {
      let arr=[];
      for(let idx = 0; idx < counts; idx++){
            let coords = getMarbleLocation(marbleData[0], idx);
            arr.push(<Marble marbleColor={marbleData[1]} coordsLeft={coords.left} coordsTop={coords.top} />)
      }
      return (<div>{arr.map(marble=>marble)}</div>);
}

/*
    * Creates all Board Marbles
    * @param {array[data.board]} arr
*/
  const createBoardMarbles = (arr) => {
  let resArr=[];
  let counter = 0;
  while(counter < 64){
      if (boardIdx == 64){boardIdx = 0;}
      let marbleColor = arr[boardIdx]; //get arr at idx 16
      let coords;
      switch(marbleColor){
        case "NONE":
          coords = getMarbleLocation('main_circle', counter);
          resArr.push(<Marble marbleColor='none' coordsLeft={coords.left} coordsTop={coords.top} />)
          break;
        case "BLUE":
          coords = getMarbleLocation('main_circle', counter);
          resArr.push(<Marble marbleColor='/resources/marble_b_light.png' coordsLeft={coords.left} coordsTop={coords.top} />)
          break;

        case "RED":
          coords = getMarbleLocation('main_circle', counter);
          resArr.push(<Marble marbleColor='/resources/marble_r_light.png' coordsLeft={coords.left} coordsTop={coords.top} />)
          break;

        case "YELLOW":
          coords = getMarbleLocation('main_circle', counter);
          resArr.push(<Marble marbleColor='/resources/marble_y_light.png' coordsLeft={coords.left} coordsTop={coords.top} />)
          break;

        case "GREEN":
         coords = getMarbleLocation('main_circle', counter);
         resArr.push(<Marble marbleColor='/resources/marble_g_light.png' coordsLeft={coords.left} coordsTop={coords.top} />)
         break;
      }
      boardIdx++;
      counter++;
  }
  return (<div>{resArr.map(marble=>marble)}</div>);
}

/*
    * Creates all Goal Marbles
    * @param {array[data.board]} arr -> goal layout
    * @param {arr['where', 'img_path]} marbleData -> marble characteristics = perspective variables
*/
  const createGoalMarbles = (arr, marbleData) => {
  let resArr=[];
  for(let idx = 0; idx < 4; idx++){
      let marbleColor = arr[idx];
      let coords;
      if(marbleColor != "NONE"){
          coords = getMarbleLocation(marbleData[0], idx);
          resArr.push(<Marble marbleColor={marbleData[1]} coordsLeft={coords.left} coordsTop={coords.top} />);
      }
      else{
      coords = getMarbleLocation(marbleData[0], idx);
      resArr.push(<Marble marbleColor='none' coordsLeft={coords.left} coordsTop={coords.top} />);
      }
  }
  return (<div>{resArr.map(marble=>marble)}</div>);
}

  // placeholder/ storage for all Marbles
  let blueBaseMarbles, redBaseMarbles, yellowBaseMarbles, greenBaseMarbles, blueGoalMarbles, redGoalMarbles, yellowGoalMarbles, greenGoalMarbles, boardMarbles;

  //calls all creation methods and stores marbles
  if(data != null)
  {
    console.log(data.blueGoal);
    blueBaseMarbles = (createBaseMarbles(data.blueBase, blueB));
    redBaseMarbles = (createBaseMarbles(data.redBase, redB));
    yellowBaseMarbles = (createBaseMarbles(data.yellowBase, yellowB));
    greenBaseMarbles = (createBaseMarbles(data.greenBase, greenB));
    boardMarbles = (createBoardMarbles(data.board));
    blueGoalMarbles = (createGoalMarbles(data.blueGoal, blueG));
    redGoalMarbles = (createGoalMarbles(data.redGoal, redG));
    yellowGoalMarbles = (createGoalMarbles(data.yellowGoal, yellowG));
    greenGoalMarbles = (createGoalMarbles(data.greenGoal, greenG));
  }


  return (
    <BaseContainer>
        {blueBaseMarbles}
        {redBaseMarbles}
        {yellowBaseMarbles}
        {greenBaseMarbles}
        {boardMarbles}
        {blueGoalMarbles}
        {redGoalMarbles}
        {yellowGoalMarbles}
        {greenGoalMarbles}
    </BaseContainer>
  );
}

export default Marbles;
