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
    fakeData.board = ["NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN"];
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

  const createBaseMarbles = (counts, marbleColor) => {

  switch(marbleColor){
    case "BLUE-BASE":
      let arr=[];
      for(let idx = 0; idx < counts; idx++){
            let coords = getMarbleLocation('bl_base', idx);
            arr.push(<Marble marbleColor='/resources/marble_b_light.png' coordsLeft={coords.left} coordsTop={coords.top} />)
      }
      return (<div>{arr.map(marble=>marble)}</div>);

    case "RED-BASE":
      arr=[];
      for(let idx = 0; idx < counts; idx++){
            let coords = getMarbleLocation('br_base', idx);
            arr.push(<Marble marbleColor='/resources/marble_r_light.png' coordsLeft={coords.left} coordsTop={coords.top} />)
      }
      return (<div>{arr.map(marble=>marble)}</div>);

    case "YELLOW-BASE":
      arr=[];
      for(let idx = 0; idx < counts; idx++){
            let coords = getMarbleLocation('tr_base', idx);
            arr.push(<Marble marbleColor='/resources/marble_y_light.png' coordsLeft={coords.left} coordsTop={coords.top} />)
      }
      return (<div>{arr.map(marble=>marble)}</div>);

    case "GREEN-BASE":
      arr=[];
      for(let idx = 0; idx < counts; idx++){
            let coords = getMarbleLocation('tl_base', idx);
            arr.push(<Marble marbleColor='/resources/marble_g_light.png' coordsLeft={coords.left} coordsTop={coords.top} />)
      }
      return (<div>{arr.map(marble=>marble)}</div>);
  }
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

const createGoalMarbles = (arr) => {
  let resArr=[];
  for(let idx = 0; idx < 4; idx++){
      let marbleColor = arr[idx];
      let coords;
      switch(marbleColor){
        case "NONE":
          break;
        case "BLUE":
          coords = getMarbleLocation('bl_goal', idx);
          resArr.push(<Marble marbleColor='/resources/marble_b_light.png' coordsLeft={coords.left} coordsTop={coords.top} />)
          break;

        case "RED":
          coords = getMarbleLocation('br_goal', idx);
          resArr.push(<Marble marbleColor='/resources/marble_r_light.png' coordsLeft={coords.left} coordsTop={coords.top} />)
          break;

        case "YELLOW":
          coords = getMarbleLocation('tr_goal', idx);
          resArr.push(<Marble marbleColor='/resources/marble_y_light.png' coordsLeft={coords.left} coordsTop={coords.top} />)
          break;

        case "GREEN":
         coords = getMarbleLocation('tl_goal', idx);
         resArr.push(<Marble marbleColor='/resources/marble_g_light.png' coordsLeft={coords.left} coordsTop={coords.top} />)
         break;
      }
  }
  return (<div>{resArr.map(marble=>marble)}</div>);
}

  let blueBaseMarbles, redBaseMarbles, yellowBaseMarbles, greenBaseMarbles, blueGoalMarbles, redGoalMarbles, yellowGoalMarbles, greenGoalMarbles, boardMarbles;


  if(data != null)
  {
    blueBaseMarbles = (createBaseMarbles(data.blueBase, "BLUE-BASE"));
    redBaseMarbles = (createBaseMarbles(data.redBase, "RED-BASE"));
    yellowBaseMarbles = (createBaseMarbles(data.yellowBase, "YELLOW-BASE"));
    greenBaseMarbles = (createBaseMarbles(data.greenBase, "GREEN-BASE"));
    boardMarbles = (createBoardMarbles(data.board));
    blueGoalMarbles = (createGoalMarbles(data.blueGoal));
    redGoalMarbles = (createGoalMarbles(data.redGoal));
    yellowGoalMarbles = (createGoalMarbles(data.yellowGoal));
    greenGoalMarbles = (createGoalMarbles(data.greenGoal));
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
