import { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import WinningDisplay from "components/ui/WinningDisplay";
import PlayerInfo from "components/ui/PlayerInfo";
import Board from "components/views/Board";
import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import HandsWrapper from "components/ui/HandsWrapper";
import CardStack from "components/ui/CardStack";
import Marbles from "components/views/Marbles";
import TurnIndicator from "components/ui/TurnIndicator";
import InfoButtons, { InfoBlockLeft, InfoBlockRight } from "components/ui/InfoBlock";
import updateManager from "helpers/updateManager";
import { VoiceChatManager } from "components/voice/voiceChat";
import JokerSelectWrapper from "components/ui/JokerSelectWrapper";
import LoadingScreen from "components/ui/LoadingScreen";
import { addInfo } from "./ErrorDisplay";
import { timeout } from "sockjs-client/lib/info-receiver";

const Game = () => {
  const history = useHistory();
  updateManager.connectToPersonalUpdate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateManager.connectToPersonalUpdate();
    function gameUpdateListener(event) {
      addInfo("Game closed because a player left.", 5000);
      history.push("/menu");
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
      <div className="board flex">
        {/* <InfoBlockLeft /> */}
        <div className="board container">
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
        {/* <InfoBlockRight /> */}
        <WinningDisplay />
        {loading ? <LoadingScreen /> : null}
      </div>
    </BaseContainer>
  );
};

export default Game;
