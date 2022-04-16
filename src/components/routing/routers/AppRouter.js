import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";
import GameRouter from "components/routing/routers/GameRouter";
import {LoginGuard} from "components/routing/routeProtectors/LoginGuard";
import Login from "components/views/RegistrationLogin";
import Lobby from "components/views/Lobby";
import Game from "components/views/Game";
import Board from "components/views/Board";
import RegistrationLogin from "components/views/RegistrationLogin";
import Menu from "../../views/Menu";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/game">
            <Game/>
        </Route>
        <Route exact path="/login">
          <LoginGuard>
            <RegistrationLogin/>
          </LoginGuard>
        </Route>
        <Route exact path="/">
          <Redirect to="/menu"/>
        </Route>
        <Route exact path="/menu">
          <GameGuard>
            <Menu/>
          </GameGuard>
        </Route>
        <Route exact path="/lobby">
          <Lobby/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
