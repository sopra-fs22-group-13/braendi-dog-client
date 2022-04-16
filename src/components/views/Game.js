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


const Game = () => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);

useEffect(() => {
    let fakeData = new Object();
    fakeData.board = ["NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN", "NONE", "NONE", "YELLOW", "RED", "NONE", "NONE", "NONE", "GREEN"];
    fakeData.redGoal = ["NONE", "NONE", "NONE", "RED"];
    fakeData.greenGoal = ["NONE", "NONE", "GREEN", "GREEN"];
    fakeData.blueGoal = ["NONE", "NONE", "NONE", "BLUE"];
    fakeData.yellowGoal = ["NONE", "NONE", "NONE", "NONE"];
    fakeData.redBase = 2;
    fakeData.greenBase = 1;
    fakeData.blueBase = 3;
    fakeData.yellowBase = 3;
    fakeData.lastPlayedCard = "2S";
    fakeData.colorMapping = {128: "RED", 12: "BLUE", 124: "YELLOW", 38: "GREEN"};
    setData(fakeData);
}, []);


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

//if(data.colorMapping(localStorage.getItem(userId))){
  switch(userColor){
    case "BLUE":
        background =(
            <img src={process.env.PUBLIC_URL + '/resources/blue_4k_b_compressed.jpg'} className="board bg-img"/>
        );
        break;
    case "GREEN":
        background =(
            <img src={process.env.PUBLIC_URL + '/resources/blue_4k_g_compressed.jpg'} className="board bg-img"/>
        );
        break;
    case "RED":
        background =(
            <img src={process.env.PUBLIC_URL + '/resources/blue_4k_r_compressed.jpg'} className="board bg-img"/>
        );
        break;
    case "YELLOW":
        background =(
           <img src={process.env.PUBLIC_URL + '/resources/blue_4k_y_compressed.jpg'} className="board bg-img"/>
        );
        break;
  }
//};

  return (
    <BaseContainer className="game">
        <div className="board flex">
            <div className="board container">
                {background}
                <HandsWrapper></HandsWrapper>
            </div>
        </div>
    </BaseContainer>
  );
}

export default Game;
