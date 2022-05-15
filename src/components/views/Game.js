import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import WinningDisplay from 'components/ui/WinningDisplay';
import PlayerInfo from 'components/ui/PlayerInfo';
import Board from 'components/views/Board';
import {useHistory} from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import HandsWrapper from 'components/ui/HandsWrapper';
import CardStack from 'components/ui/CardStack';
import Marbles from 'components/views/Marbles';
import TurnIndicator from 'components/ui/TurnIndicator';
import { InfoBlockLeft, InfoBlockRight } from 'components/ui/InfoBlock';
import updateManager from 'helpers/updateManager';
import { VoiceChatManager } from 'components/voice/voiceChat';
import JokerSelectWrapper from 'components/ui/JokerSelectWrapper';

const Game = () => {

  updateManager.connectToPersonalUpdate();

  return (
    <BaseContainer className="game">
    <div className="board flex">
        <InfoBlockLeft/>
        <div className="board container">
            <Board/>
            <TurnIndicator></TurnIndicator>
            <CardStack/>
            <div className="play-container">
                <PlayerInfo/>
                <HandsWrapper></HandsWrapper>
                <JokerSelectWrapper></JokerSelectWrapper>
                <Marbles/>
            </div>
        </div>
        <InfoBlockRight/>
        <WinningDisplay/>
    </div>
    </BaseContainer>
  );
}

export default Game;
