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

import React from "react";
import {useState} from 'react';
import PropTypes from "prop-types";
import 'styles/ui/Card.scss';

/**
 * very brute forced solution to the problem of passing the card value
 * to the card component.
 */

// importing the card .svg files
import BACK from './images/card_back_red.svg';
import JOKER from './images/Joker.svg';

// import for the clovers
import C2 from './images/2C.svg';
import C3 from './images/3C.svg';
import C4 from './images/4C.svg';
import C5 from './images/5C.svg';
import C6 from './images/6C.svg';
import C7 from './images/7C.svg';
import C8 from './images/8C.svg';
import C9 from './images/9C.svg';
import C10 from './images/10C.svg';
import CJ from './images/JC.svg';
import CQ from './images/QC.svg';
import CK from './images/KC.svg';
import CA from './images/AC.svg';

// import for the diamonds
import D2 from './images/2D.svg';
import D3 from './images/3D.svg';
import D4 from './images/4D.svg';
import D5 from './images/5D.svg';
import D6 from './images/6D.svg';
import D7 from './images/7D.svg';
import D8 from './images/8D.svg';
import D9 from './images/9D.svg';
import D10 from './images/10D.svg';
import DJ from './images/JD.svg';
import DQ from './images/QD.svg';
import DK from './images/KD.svg';
import DA from './images/AD.svg';

// import for the hearts
import H2 from './images/2H.svg';
import H3 from './images/3H.svg';
import H4 from './images/4H.svg';
import H5 from './images/5H.svg';
import H6 from './images/6H.svg';
import H7 from './images/7H.svg';
import H8 from './images/8H.svg';
import H9 from './images/9H.svg';
import H10 from './images/10H.svg';
import HJ from './images/JH.svg';
import HQ from './images/QH.svg';
import HK from './images/KH.svg';
import HA from './images/AH.svg';

// import for the spades
import S2 from './images/2S.svg';
import S3 from './images/3S.svg';
import S4 from './images/4S.svg';
import S5 from './images/5S.svg';
import S6 from './images/6S.svg';
import S7 from './images/7S.svg';
import S8 from './images/8S.svg';
import S9 from './images/9S.svg';
import S10 from './images/10S.svg';
import SJ from './images/JS.svg';
import SQ from './images/QS.svg';
import SK from './images/KS.svg';
import SA from './images/AS.svg';
import { moveManager } from "helpers/moveManager";


// get card from cardValue
function getCard(props) {
    let cardPath = props.cardValue;
    switch(cardPath) {
        case "Joker": return JOKER;
        case "2C": return C2;
        case "3C": return C3;
        case "4C": return C4;
        case "5C": return C5;
        case "6C": return C6;
        case "7C": return C7;
        case "8C": return C8;
        case "9C": return C9;
        case "10C": return C10;
        case "JC": return CJ;
        case "QC": return CQ;
        case "KC": return CK;
        case "AC": return CA;
        case "2D": return D2;
        case "3D": return D3;
        case "4D": return D4;
        case "5D": return D5;
        case "6D": return D6;
        case "7D": return D7;
        case "8D": return D8;
        case "9D": return D9;
        case "10D": return D10;
        case "JD": return DJ;
        case "QD": return DQ;
        case "KD": return DK;
        case "AD": return DA;
        case "2H": return H2;
        case "3H": return H3;
        case "4H": return H4;
        case "5H": return H5;
        case "6H": return H6;
        case "7H": return H7;
        case "8H": return H8;
        case "9H": return H9;
        case "10H": return H10;
        case "JH": return HJ;
        case "QH": return HQ;
        case "KH": return HK;
        case "AH": return HA;
        case "2S": return S2;
        case "3S": return S3;
        case "4S": return S4;
        case "5S": return S5;
        case "6S": return S6;
        case "7S": return S7;
        case "8S": return S8;
        case "9S": return S9;
        case "10S": return S10;
        case "JS": return SJ;
        case "QS": return SQ;
        case "KS": return SK;
        case "AS": return SA;
        default: return BACK;
    }
}


/**
 * takes cardValue as a prop and renders the card based on the cardValue
 * and the cardHeight
 */
let inFocus = false;


const Card = props => {
    const [inFocus, setFocus] = useState(null);
    const [callbackId, setCallbackId] = useState(-1);
    let cardValue = props.cardValue;
    let k;
    function endFocus(type){
        setFocus(false);
        moveManager.unregisterCallback(callbackId);
    }

    function selectThisCardFunction()
    {
        setFocus(true);
        setCallbackId(moveManager.registerCallback(endFocus, true, false, true, true));
    }

    let cardPath = getCard(props);
    if(props.faceDown) {
        return (
            <div className="card">
                <img src={BACK} alt="card back" style={{top: Math.random() * 10/2 + "%"}}/>
            </div>
        );
    }else {
        if(inFocus){
            return(
                <div className={"card selected " + (props.small? "small" : "normal")}>
                <img src={cardPath} alt="card front"
                    onClick={() => {
                        if(props.selectable){
                            props.selectFunction(cardValue, selectThisCardFunction);
                            setFocus(true);
                            setCallbackId(moveManager.registerCallback(endFocus, true, false, true, true));
                        }
                    }}
                />
            </div>
            )
            
        }else{
            return (
                <div className={"card " + (props.small? "small" : "normal")}>
                    <img src={cardPath} alt="card front"
                        onClick={() => {
                            if(props.selectable){
                                props.selectFunction(cardValue, selectThisCardFunction);
                                setFocus(true);
                                setCallbackId(moveManager.registerCallback(endFocus, true, false, true, true));
                            }
                        }
                        }
                    />
                </div>
            );
        }
    }
}

// implement animation to handle card flipping


Card.propTypes = {
    cardValue: PropTypes.string,
    cardHeight: PropTypes.number,
    faceDown: PropTypes.bool,
};

export default Card;