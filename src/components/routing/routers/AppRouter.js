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
import ProfilePage from "../../views/ProfilePage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/game">
          <GameGuard>
            <Game/>
          </GameGuard>
        </Route>
        <Route exact path="/login">
          <LoginGuard>
            <RegistrationLogin/>
          </LoginGuard>
        </Route>
        <Route exact path="/menu">
          <MenuGuard>
            <Menu/>
          </MenuGuard>
        </Route>
        <Route exact path="/profilePage">
          <MenuGuard>
            <ProfilePage/>
          </MenuGuard>
        </Route>
        <Route exact path="/lobby">
          <LobbyGuard>
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
