/*
    dog-client is the client component of an online web implementation of dog.
    Copyright (C) 2022  Luca Zwahlen

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
import EditProfile from "../../views/EditProfile";

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
        <Route exact path="/editProfile">
          <MenuGuard>
            <EditProfile/>
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
