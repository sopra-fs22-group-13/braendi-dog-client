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

import React from 'react';
import 'styles/ui/CardStack.scss';
import Card from './Card';
import {useEffect, useState} from 'react';
import {api} from 'helpers/api';

/**
 * CardStack component to contain the last played card
 */

const CardStack = props => {
    const [data, setData] = useState(null);

    useEffect(() => {
        //get the data for last played card
        function boardUpdateListener()
        {
          const response = api.get(`/game/${localStorage.getItem("gametoken")}/board`, {
          headers: {
              'Authorization': "Basic " + localStorage.getItem("token")
              }
          });

          response.then((result) => {
            let newData = JSON.parse(JSON.stringify(result.data));
            setData(newData);
          });
        }

        //initial request
        boardUpdateListener();

        //only add the listener on initial render, otherwise we have multiple
        document.addEventListener("boardUpdate", boardUpdateListener);

        return () => { // This code runs when component is unmounted
          document.removeEventListener("boardUpdate", boardUpdateListener);
        }

    }, []);

    let stackCard;


    if(data && data.lastPlayedCard != null){
        stackCard = (<Card cardValue={data.lastPlayedCard} faceDown={false}/>)
    }

    if(stackCard){
        return(
            <div className='stack'>
                <div className="stack stack-card">
                    {stackCard}
                </div>
            </div>
        );
    }
    return null;
}

export default CardStack;