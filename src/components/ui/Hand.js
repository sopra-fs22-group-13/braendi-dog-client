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
        <div className='hand'>
            {playerCards.map((card, index) => {
                return(
                    <Card {...card} key={index}/>
                )
            })}
        </div>
    );
}

// parse card array

Hand.propTypes = {
    playerCards: PropTypes.array,
};

export default Hand;