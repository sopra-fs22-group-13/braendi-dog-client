import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import PromptNotification from 'components/ui/PromptNotification';
import Board from 'components/views/Board';
import {useHistory} from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import HandsWrapper from 'components/ui/HandsWrapper';
import Marbles from 'components/views/Marbles';
import TurnIndicator from 'components/ui/TurnIndicator';
import { InfoBlockLeft, InfoBlockRight } from 'components/ui/InfoBlock';


const Game = () => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);


  const logout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  }

const [winner, setWinner] = useState("Red");
let winnerPrompt;
  useEffect(() => {
    document.addEventListener("winUpdate", event => {
            //setWinner = event.detail.keyToBeSet; gibt color?
            winnerPrompt = (
                <PromptNotification label ={winner + " won! Congrats!"}/>
            );
        });
  }, []);

  let background = <Spinner/>;
  let userColor = "RED";

  return (
    <BaseContainer className="game">
    <div className="board flex">
        <InfoBlockLeft/>
        <div className="board container">
            <Board/>
            <TurnIndicator></TurnIndicator>
            <HandsWrapper></HandsWrapper>
            <Marbles/>
            {winnerPrompt}
        </div>
        <InfoBlockRight/>

    </div>
    </BaseContainer>
  );
}

export default Game;
