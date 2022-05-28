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