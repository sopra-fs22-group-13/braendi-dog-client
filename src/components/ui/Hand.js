import React from 'react';
import PropTypes from "prop-types";

/**
 * Hand component to contain the cards of the player
 */

// hand houses the cards of the player
const Hand = props => {
    let playerCards = props.playerCards;
    return(
        <div>
            
        </div>
    );
}

Hand.PropTypes = {
    playerCards: PropTypes.array,
}

export default Hand;