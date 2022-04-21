import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Marble.scss";


/* Marble component
    * @param {'img_path'} marbleColor
    * @param {number} coordsLeft, coordsTop
*/

const Marble = props => {
    const [selection, setSelection] = useState(false);

    if(selection){
        if(props.marbleColor == 'none'){
            return(<div className="marble selected"
            style={{left: props.coordsLeft - 1.5 + '%', top: props.coordsTop - 2 + '%'}}
            onClick={() => setSelection(!selection)}>
            </div>);
            }
        else{
            return(
                <img src={process.env.PUBLIC_URL + props.marbleColor}
                style={{left: props.coordsLeft - 1.5 + '%', top: props.coordsTop - 2 + '%'}}
                className="marble selected"
                onClick={() => setSelection(!selection)}
                />
            );
        }
    }
    else{
        if(props.marbleColor == 'none'){
                return(<div className="marble"
                style={{left: props.coordsLeft - 1.5 + '%', top: props.coordsTop - 2 + '%'}}
                onClick={() => setSelection(!selection)}>
                </div>);
                }
        else{
            return(
                <img src={process.env.PUBLIC_URL + props.marbleColor}
                style={{left: props.coordsLeft - 1.5 + '%', top: props.coordsTop - 2 + '%'}}
                className="marble"
                onClick={() => setSelection(!selection)}
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