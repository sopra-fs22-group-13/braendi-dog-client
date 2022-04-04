import React from 'react';
import PropTypes from "prop-types";
import 'styles/ui/Hand.scss';
import Card from './Card';

/**
 * Hand component to contain the cards of the player
 */

// hand houses the cards of the player
const Hand = props => {
    let playerCards = props.playerCards;
    return(
        <div className='bottom-hand'>
            {playerCards.map((card, index) => {
            })}
        </div>
    );
}

Hand.propTypes = {
    playerCards: PropTypes.array,
};

export default Hand;