import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import Board from 'components/views/Board';
import {useHistory} from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import HandsWrapper from 'components/ui/HandsWrapper';
import Marbles from 'components/views/Marbles';


const Game = () => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);


  const logout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  }

/*
let lobbyId;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/lobby/' + lobbyId);

        setUsers(response.data);

        console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while fetching the users! See the console for details.");
      }
    }

    fetchData();
  }, []);
*/


  let background = <Spinner/>;
  let userColor = "RED";

  return (
    <BaseContainer className="game">
    <div className="board flex">
        <div className="board container">
            <Board/>
            <HandsWrapper></HandsWrapper>
            <Marbles/>
        </div>
    </div>
    </BaseContainer>
  );
}

export default Game;
