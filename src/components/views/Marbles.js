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
import { moveManager } from 'helpers/moveManager';
import { SecurityUpdate } from '@mui/icons-material';
import ErrorDisplay, { addError } from './ErrorDisplay';

//button to press when finishing a 7 turn
const SevenOkButton = props => {
  const [enabled, setEnabled] = useState(false);
  function toggleSevenButton()
  {
    setEnabled(!enabled);
  }
  useEffect(() => {
    props.registerEnableSevenButton(toggleSevenButton)
  }, []);

  return(
    <Button>Ok</Button>
  )

}

//Marbles component (layer of all marbles)
const Marbles = props => {
  const [data, setData] = useState(null);

useEffect(() => {
    //get the data for marble layout
    function boardUpdateListener()
    {
      const response = api.get(`/game/${localStorage.getItem("gametoken")}/board`, {
      headers: {
          'Authorization': "Basic " + localStorage.getItem("token")
          }
      });

      response.then((result) => {
        let newData = JSON.parse(JSON.stringify(result.data));
        setData(newData);
      });
    }

    //initial request
    boardUpdateListener();

    //only add the listener on initial render, otherwise we have multiple
    document.addEventListener("boardUpdate", boardUpdateListener);

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

    return () => { // This code runs when component is unmounted
      document.removeEventListener("boardUpdate", boardUpdateListener);
    }

}, []);

//variables to adapt to player (color) perspective
let boardIdx, blueB, blueG, redB, redG, yellowB, yellowG, greenB, greenG;
let userColor;

//implementation for when localStorage has userColor stored: userColor = data.colorMapping[localStorage.getItem('userColor')]} -> TODO registration/ login
  if (data != null){userColor = data.colorMapping[localStorage.getItem("userID")];}

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
      default:
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
}

  //onClick handles
  //normal values are fine because if we rerender Marbles, the turn gets cancelled anyway

  const [fromPos, setFromPos] = useState(undefined);
  const [toPos, setToPos] = useState(undefined);
  const [isSeven, setIsSeven] = useState(false);
  const [sevenList, setSevenList] = useState(undefined);

  useEffect(() => {
    moveManager.registerCallback(moveReset, true, false, false);
  }, []);

  function moveReset(type)
  {
    console.log(fromPos, toPos);

    setFromPos(undefined);
    setToPos(undefined);
    setSevenList(undefined);
    setIsSeven(moveManager.getSelectedCard().includes("7"));
  }

    /**
   * @returns {boolean} if the clicked marble should be selected
   */
  function handleMarbleClick(index, inGoal, color, goalColor)
  {

    if(!userColor) userColor = "BLUE";

    if(!fromPos && color != userColor) return;
    if(fromPos && !toPos && index == -1) return;
    if(!moveManager.isMarbleTurn()) return;
    if(goalColor != userColor && goalColor != undefined) return;

    //deselect
    if(fromPos && index == fromPos[0] && inGoal == fromPos[1] && color == fromPos[2])
    {
      //deselecting from pos
      setFromPos(undefined);
      return;
    }
    if(toPos && index == toPos[0] && inGoal == toPos[1] && color == toPos[2])
    {
      //deselecting from pos
      setToPos(undefined);
      return;
    }

    if(!fromPos)
    {
      setFromPos([index, inGoal, color, goalColor]);
      return;
    }

    if(!toPos)
    {
      setToPos([index, inGoal, color, goalColor]);
      return;
    }
  }

  function handleMoveDone()
  {
    //not seven
    if(!isSeven)
    {
      moveManager.setColor(fromPos[2]);
      moveManager.addMove(fromPos[0], toPos[0], fromPos[1], toPos[1]);
      moveManager.makeMoveRequest().then((errorcode) => addError("Failed Move: Code " + errorcode, 3000));

      setFromPos(undefined);
      setToPos(undefined);
    }
    else //7, I cannot be bothered
    {
      //add the last move
      moveManager.setColor(fromPos[2]);
      moveManager.addMove(fromPos[0], toPos[0], fromPos[1], toPos[1]);

      moveManager.makeMoveRequest().then((errorcode) => addError("Failed Move: Code " + errorcode, 3000));
      setFromPos(undefined);
      setToPos(undefined);
    }
  }

  function handleSevenNext()
  {
    moveManager.setColor(fromPos[2]);
    moveManager.addMove(fromPos[0], toPos[0], fromPos[1], toPos[1]);

    setFromPos(undefined);
    setToPos(undefined);
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
            let colorValue;
            switch(marbleData[1])
            {
              case "/resources/marble_b_light.png":
                colorValue = "BLUE";
                break;
              case "/resources/marble_r_light.png":
                colorValue = "RED";
                break;
              case "/resources/marble_y_light.png":
                colorValue = "YELLOW";
                break;
              case "/resources/marble_g_light.png":
                colorValue = "GREEN";
                break;
            }
            let shoudBeSelected = arr.length == counts - 1 && (fromPos && -1 == fromPos[0] && false == fromPos[1] && colorValue == fromPos[2]);
            arr.push(<Marble marbleColor={marbleData[1]} index={-1} inGoal={false} colorValue={colorValue} selected={shoudBeSelected} handleMarbleClick={handleMarbleClick} coordsLeft={coords.left} coordsTop={coords.top} />)
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
      let shoudBeSelected = (fromPos && counter == fromPos[0] && false == fromPos[1] && marbleColor == fromPos[2]) || (toPos && counter == toPos[0] && false == toPos[1] && marbleColor == toPos[2]);
      switch(marbleColor){
        case "NONE":
          coords = getMarbleLocation('main_circle', counter);
          resArr.push(<Marble marbleColor='none' colorValue={marbleColor} index={counter} inGoal={false} selected={shoudBeSelected} handleMarbleClick={handleMarbleClick} coordsLeft={coords.left} coordsTop={coords.top} />)
          break;
        case "BLUE":
          coords = getMarbleLocation('main_circle', counter);
          resArr.push(<Marble marbleColor='/resources/marble_b_light.png' colorValue={marbleColor} index={counter} inGoal={false} selected={shoudBeSelected} handleMarbleClick={handleMarbleClick} coordsLeft={coords.left} coordsTop={coords.top} />)
          break;

        case "RED":
          coords = getMarbleLocation('main_circle', counter);
          resArr.push(<Marble marbleColor='/resources/marble_r_light.png' colorValue={marbleColor} index={counter} inGoal={false} selected={shoudBeSelected} handleMarbleClick={handleMarbleClick} coordsLeft={coords.left} coordsTop={coords.top} />)
          break;

        case "YELLOW":
          coords = getMarbleLocation('main_circle', counter);
          resArr.push(<Marble marbleColor='/resources/marble_y_light.png' colorValue={marbleColor} index={counter} inGoal={false} selected={shoudBeSelected} handleMarbleClick={handleMarbleClick} coordsLeft={coords.left} coordsTop={coords.top} />)
          break;

        case "GREEN":
         coords = getMarbleLocation('main_circle', counter);
         resArr.push(<Marble marbleColor='/resources/marble_g_light.png' colorValue={marbleColor} index={counter} inGoal={false} selected={shoudBeSelected} handleMarbleClick={handleMarbleClick} coordsLeft={coords.left} coordsTop={coords.top} />)
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
      let colorValue;
      switch(marbleData[1])
      {
        case "/resources/marble_b_light.png":
          colorValue = "BLUE";
          break;
        case "/resources/marble_r_light.png":
          colorValue = "RED";
          break;
        case "/resources/marble_y_light.png":
          colorValue = "YELLOW";
          break;
        case "/resources/marble_g_light.png":
          colorValue = "GREEN";
          break;
      }

      let shoudBeSelected = (fromPos && idx == fromPos[0] && true == fromPos[1] && marbleColor == fromPos[2]) || (toPos && idx == toPos[0] && true == toPos[1] && colorValue == toPos[3]);

      if(marbleColor != "NONE"){
          coords = getMarbleLocation(marbleData[0], idx);
          resArr.push(<Marble marbleColor={marbleData[1]} colorValue={marbleColor} index={idx} inGoal={true} goalColor={colorValue} selected={shoudBeSelected} handleMarbleClick={handleMarbleClick} coordsLeft={coords.left} coordsTop={coords.top} />);
      }
      else{
      coords = getMarbleLocation(marbleData[0], idx);
      resArr.push(<Marble marbleColor='none' colorValue={marbleColor} index={idx} inGoal={true} goalColor={colorValue} selected={shoudBeSelected} handleMarbleClick={handleMarbleClick} coordsLeft={coords.left} coordsTop={coords.top} />);
      }
  }
  return (<div>{resArr.map(marble=>marble)}</div>);
}

  // placeholder/ storage for all Marbles
  let blueBaseMarbles, redBaseMarbles, yellowBaseMarbles, greenBaseMarbles, blueGoalMarbles, redGoalMarbles, yellowGoalMarbles, greenGoalMarbles, boardMarbles;

  //calls all creation methods and stores marbles
  if(data != null)
  {
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
        {toPos && fromPos? <Button className={"turn-button"} onClick={handleMoveDone}>End Turn</Button> : null}
        {toPos && fromPos && isSeven? <Button className={"turn-button"} onClick={handleSevenNext}>Next</Button> : null}

    </BaseContainer>
  );
}

export default Marbles;
