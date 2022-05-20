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