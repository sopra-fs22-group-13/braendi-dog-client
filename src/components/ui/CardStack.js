import React from 'react';
import PropTypes from "prop-types";
import 'styles/ui/CardStack.scss';
import Card from './Card';

/**
 * CardStack component to contain the last played card
 */

// hand houses the cards of the player
const CardStack = props => {
    let stackCard = props.stackCard;
    return(
        <div className='stack'>
            <div className="stack stack-card">
                <Card cardValue={stackCard} faceDown={false}/>
            </div>
        </div>
    );
}

// parse card array

CardStack.propTypes = {
    stackCard: PropTypes.string,
};

export default CardStack;