import BaseContainer from "components/ui/BaseContainer";
import CardStack from "components/ui/CardStack";
import DummyCardLoader from "components/ui/DummyCardLoader";
import HandsWrapper from "components/ui/HandsWrapper";
import InfoButtons from "components/ui/InfoBlock";
import JokerSelectWrapper from "components/ui/JokerSelectWrapper";
import LoadingScreen from "components/ui/LoadingScreen";
import PlayerInfo from "components/ui/PlayerInfo";
import TurnIndicator from "components/ui/TurnIndicator";
import WinningDisplay from "components/ui/WinningDisplay";
import Board from "components/views/Board";
import Marbles from "components/views/Marbles";
import updateManager from "helpers/updateManager";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "styles/views/Game.scss";
import { addInfo } from "./ErrorDisplay";
import { VoiceChatManager } from "components/voice/voiceChat";

const Game = () => {
  const history = useHistory();
  updateManager.connectToPersonalUpdate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateManager.connectToPersonalUpdate();
    const leave = () =>{
      localStorage.removeItem('lobbyId');
      localStorage.removeItem('gametoken');
      VoiceChatManager.disconnectFromVc();
      history.push("/menu");
    }
    function gameUpdateListener(event) {
      addInfo("Game closed because a player left.", 5000);
      setTimeout(() => leave(), 5000);
    }
    document.addEventListener("gameUpdate", gameUpdateListener);

    let inter = setInterval(() => {
      let images = document.querySelectorAll("img");
      let isLoaded = true;
      images.forEach((image) => {
        isLoaded = isLoaded && image.complete && image.naturalHeight !== 0;
      });

      if (isLoaded) {
        clearInterval(inter);
        setLoading(false);
      }
    }, 1000);

    setTimeout(() => {
      //failsave when some images might fail to load
      //show the screen anyway
      clearInterval(inter);
      setLoading(false);
    }, 20000);

    return () => {
      // This code runs when component is unmounted
      document.removeEventListener("gameUpdate", gameUpdateListener);
    };
  }, []);

  return (
    <BaseContainer className="game">
      {loading ? <LoadingScreen /> : null}
      <div className="board flex">
        <div className="board container">
          <DummyCardLoader></DummyCardLoader>
          <Board />
          <TurnIndicator></TurnIndicator>
          <CardStack />
          <div className="play-container">
            <PlayerInfo />
            <HandsWrapper></HandsWrapper>
            <Marbles />
            <JokerSelectWrapper></JokerSelectWrapper>
            <InfoButtons></InfoButtons>
          </div>
        </div>
        <WinningDisplay />
      </div>
    </BaseContainer>
  );
};

export default Game;
