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
import updateManager from 'helpers/updateManager';

const Game = () => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);


  const logout = () => {
    updateManager.disconnectFromPersonalUpdate();
    localStorage.clear();
    history.push('/login');
  }

  const leave = () => {
    localStorage.removeItem('lobbyId');
    localStorage.removeItem('gametoken');
    history.push('/menu');
  }

const [winner, setWinner] = useState("Red");
let winnerPrompt;
  useEffect(() => {

    function winUpdateListener(event)
    {
      setWinner = event.detail.win;
        winnerPrompt = (
          <PromptNotification label ={winner + " won! Congrats!"}/>
      );
      setTimeout(leave(), 5000);
    }

    document.addEventListener("winUpdate", winUpdateListener);

    return () => { // This code runs when component is unmounted
      document.removeEventListener("winUpdate", winUpdateListener);
    }
  }, []);

  let background = <Spinner/>;

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
