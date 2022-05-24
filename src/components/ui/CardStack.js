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