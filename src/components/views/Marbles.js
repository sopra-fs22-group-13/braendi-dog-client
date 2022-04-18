import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Marbles.scss";

import { getMarbleLocation } from 'helpers/getMarbleLocation';

const Marble = props => (
    <img src={process.env.PUBLIC_URL + props.marbleColor}
    style={{left: props.coordsLeft - 1.5 + '%', top: props.coordsTop - 2 + '%'}}
    className="marbles marble"/>
);

Marble.propTypes = {
  coordsLeft: PropTypes.number,
  coordsTop: PropTypes.number
};

const Marbles = props => {
  const [data, setData] = useState(null);

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
    fakeData.board = ["BLUE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "YELLOW", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "RED", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE"];
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

// TODO: make it perspective adjustable = get colorMapping and adjust idx x * 16 -> red x=1, yellow x=2, green x=3 (blue x=0)

let board, blueB, blueG, redB, redG, yellowB, yellowG, greenB, greenG;
let playerColor = "RED";

switch(playerColor){
    case "BLUE":
        blueB = ['bl_base', '/resources/marble_b_light.png'];
        blueG = ['bl_goal', '/resources/marble_b_light.png'];
        redB = ['br_base', '/resources/marble_r_light.png'];
        redG = ['br_goal', '/resources/marble_r_light.png'];
        yellowB = ['tr_base', '/resources/marble_y_light.png'];
        yellowG = ['tr_goal', '/resources/marble_y_light.png'];
        greenB = ['tl_base', '/resources/marble_g_light.png'];
        greenG = ['tl_goal', '/resources/marble_g_light.png'];
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
        break;
}


  const createBaseMarbles = (counts, marbleColor) => {
      let arr=[];
      for(let idx = 0; idx < counts; idx++){
            let coords = getMarbleLocation(marbleColor[0], idx);
            arr.push(<Marble marbleColor={marbleColor[1]} coordsLeft={coords.left} coordsTop={coords.top} />)
      }
      return (<div>{arr.map(marble=>marble)}</div>);
}

const createBoardMarbles = (arr) => {
  let resArr=[];
  for(let idx = 0; idx < arr.length; idx++){
      let marbleColor = arr[idx];
      let coords;
      switch(marbleColor){
        case "NONE":
          break;
        case "BLUE":
          coords = getMarbleLocation('main_circle', idx);
          resArr.push(<Marble marbleColor='/resources/marble_b_light.png' coordsLeft={coords.left} coordsTop={coords.top} />)
          break;

        case "RED":
          coords = getMarbleLocation('main_circle', idx);
          resArr.push(<Marble marbleColor='/resources/marble_r_light.png' coordsLeft={coords.left} coordsTop={coords.top} />)
          break;

        case "YELLOW":
          coords = getMarbleLocation('main_circle', idx);
          resArr.push(<Marble marbleColor='/resources/marble_y_light.png' coordsLeft={coords.left} coordsTop={coords.top} />)
          break;

        case "GREEN":
         coords = getMarbleLocation('main_circle', idx);
         resArr.push(<Marble marbleColor='/resources/marble_g_light.png' coordsLeft={coords.left} coordsTop={coords.top} />)
         break;
      }
  }
  return (<div>{resArr.map(marble=>marble)}</div>);
}

const createGoalMarbles = (arr, col) => {
  let resArr=[];
  for(let idx = 0; idx < 4; idx++){
      let marbleColor = arr[idx];
      let coords;
      if(marbleColor != "NONE"){
          coords = getMarbleLocation(col[0], idx);
          resArr.push(<Marble marbleColor={col[1]} coordsLeft={coords.left} coordsTop={coords.top} />);
      }
  }
  return (<div>{resArr.map(marble=>marble)}</div>);
}

  let blueBaseMarbles, redBaseMarbles, yellowBaseMarbles, greenBaseMarbles, blueGoalMarbles, redGoalMarbles, yellowGoalMarbles, greenGoalMarbles, boardMarbles;


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
