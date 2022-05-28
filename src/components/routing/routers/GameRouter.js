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

import {Redirect, Route} from "react-router-dom";
import Game from "components/views/Game";
import PropTypes from 'prop-types';

const GameRouter = props => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Route exact path={`${props.base}/dashboard`}>
        <Game/>
      </Route>
      <Route exact path={`${props.base}`}>
        <Redirect to={`${props.base}/dashboard`}/>
      </Route>
    </div>
  );
};
/*
* Don't forget to export your component!
 */

GameRouter.propTypes = {
  base: PropTypes.string
}

export default GameRouter;
