import React from 'react';
import PropTypes from "prop-types";
import 'styles/ui/CardStack.scss';
import Card from './Card';
import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';

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
    if(data){
        stackCard = data.stackCard;
    }
    //default card for testing, delete later
    stackCard = "KD";
    if(stackCard){
        return(
            <div className='stack'>
                <div className="stack stack-card">
                    <Card cardValue={stackCard} faceDown={false}/>
                </div>
            </div>
        );
    }
    return null;
}

export default CardStack;