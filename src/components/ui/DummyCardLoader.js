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

import Hand from "./Hand";

const DummyCardLoader = () =>{
    let handInfo = ["2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "AS", "JS", "QS", "KS",
        "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "AD", "JD", "QD", "KD",
        "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "AH", "JH", "QH", "KH",
        "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "AC", "JC", "QC", "KC",
        "Joker",
    ];

    //format info
    let formattedMe = [];
    formattedMe.push({cardValue: "2S", faceDown: true});
    handInfo.forEach(cardstring => {
        formattedMe.push({cardValue: cardstring, faceDown: false});
    });

    return (
        <div style={{position: "absolute", width: "0px", height: "0px"}}>
            <Hand playerCards={formattedMe} ></Hand>
        </div>
    );
}

export default DummyCardLoader;