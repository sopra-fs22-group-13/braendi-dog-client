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

import PropTypes from "prop-types";
import "styles/views/Marble.scss";


/* Marble component
    * @param {'img_path'} marbleColor
    * @param {number} coordsLeft, coordsTop
*/

const Marble = props => {

    function onClickMarble(evt)
    {
        //go upwards, try to select me
        props.handleMarbleClick(props.index, props.inGoal? true : false, props.colorValue, props.goalColor);
    }

    if(props.selected){
        if(props.marbleColor == 'none'){
            return(<div className="marble selected"
            style={{left: props.coordsLeft - 1.5 + '%', top: props.coordsTop - 2 + '%'}}
            onClick={(e) => onClickMarble(e)}>
            </div>);
            }
        else{
            return(
                <img src={process.env.PUBLIC_URL + props.marbleColor}
                style={{left: props.coordsLeft - 1.5 + '%', top: props.coordsTop - 2 + '%'}}
                className="marble selected"
                onClick={(e) => onClickMarble(e)}
                />
            );
        }
    }
    else if (props.possibleMove){
        if(props.marbleColor == 'none'){
            return(<div className="marble possible-move"
            style={{left: props.coordsLeft - 1.5 + '%', top: props.coordsTop - 2 + '%'}}
            onClick={(e) => onClickMarble(e)}>
            </div>);
            }
        else{
            return(
                <img src={process.env.PUBLIC_URL + props.marbleColor}
                style={{left: props.coordsLeft - 1.5 + '%', top: props.coordsTop - 2 + '%'}}
                className="marble possible-move"
                onClick={(e) => onClickMarble(e)}
                />
            );
        }
    }
    else{
        if(props.marbleColor == 'none'){
                return(<div className="marble"
                style={{left: props.coordsLeft - 1.5 + '%', top: props.coordsTop - 2 + '%'}}
                onClick={(e) => onClickMarble(e)}>
                </div>);
                }
        else{
            return(
                <img src={process.env.PUBLIC_URL + props.marbleColor}
                style={{left: props.coordsLeft - 1.5 + '%', top: props.coordsTop - 2 + '%'}}
                className="marble"
                onClick={(e) => onClickMarble(e)}
                />
            );
        }
    }


}

Marble.propTypes = {
  coordsLeft: PropTypes.number,
  coordsTop: PropTypes.number
};

export default Marble;