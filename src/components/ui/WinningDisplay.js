/*
    dog-client is the client component of an online web implementation of dog.
    Copyright (C) 2022  Luca Zwahlen, Simona Borghi, Sandro Vonlanthen, Anton Crazzolara, Shitao Zeng

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

import 'styles/ui/PromptNotification.scss';
import PropTypes from "prop-types";
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { VoiceChatManager } from 'components/voice/voiceChat';
import Confetti from 'react-confetti';

const Display = props => (
  <div {...props}>
    <label className={`notification label`}>{props.label}</label>
  </div>
);

Display.propTypes = {
  label: PropTypes.string,
};

const WinningDisplay = () => {
    const history = useHistory();

    const leave = () => {
        localStorage.removeItem('lobbyId');
        localStorage.removeItem('gametoken');
        VoiceChatManager.disconnectFromVc();
        history.push('/menu');
    }

    const [winner, setWinner] = useState(null);
    let winnerPrompt;
    if(winner){
        let winnerString = winner.slice(0,1) + winner.slice(1).toLowerCase();
        winnerPrompt = (
             <>
             <Confetti gravity={0.3} initialVelocityY={20}/>
             <Display label ={winnerString + " won! Congrats!"}/>
             </>
         );
        setTimeout(() => leave(), 5000);
     }
      useEffect(() => {
        //if somebody wins, display and end game
        function winUpdateListener(event)
        {
          setWinner(event.detail.win);
        }

        document.addEventListener("winUpdate", winUpdateListener);

        return () => { // This code runs when component is unmounted
          document.removeEventListener("winUpdate", winUpdateListener);
        }
      }, []);

      return(
        <div>{winnerPrompt}</div>
      );
    }

export default WinningDisplay;