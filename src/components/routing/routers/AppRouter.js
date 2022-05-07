import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";
import {MenuGuard} from "components/routing/routeProtectors/MenuGuard";
import {LobbyGuard} from "components/routing/routeProtectors/LobbyGuard";
import GameRouter from "components/routing/routers/GameRouter";
import {LoginGuard} from "components/routing/routeProtectors/LoginGuard";
import Login from "components/views/RegistrationLogin";
import Lobby from "components/views/Lobby";
import Game from "components/views/Game";
import Board from "components/views/Board";
import RegistrationLogin from "components/views/RegistrationLogin";
import Menu from "../../views/Menu";
import { heartBeatCreator } from "helpers/heartBeatCreator";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/game">
          <GameGuard>
            {heartBeatCreator.setType("GAME")}
            <Game/>
          </GameGuard>
        </Route>
        <Route exact path="/login">
          <LoginGuard>
          {heartBeatCreator.killHeartBeat()}
            <RegistrationLogin/>
          </LoginGuard>
        </Route>
        <Route exact path="/menu">
          <MenuGuard>
          {heartBeatCreator.setType("MENU")}
            <Menu/>
          </MenuGuard>
        </Route>
        <Route exact path="/lobby">
          <LobbyGuard>
            {heartBeatCreator.setType("LOBBY")}
            <Lobby/>
          </LobbyGuard>
        </Route>
        <Route exact path="/">
          <Redirect to="/menu"/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
