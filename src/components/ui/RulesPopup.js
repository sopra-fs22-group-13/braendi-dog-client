import { Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import "styles/ui/RulesPopup.scss";
import ImgCard from './ImgCard';

const RulesPopup = props => {

    return(
        <Modal
        keepMounted
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        >
            <div className='popup box'>
                <div className="info-block">
                    <h1>Rules</h1>
                    <h2>Goal</h2>
                    To win you have to move all your marbles in the indicated goal room.
                    <h2>Process</h2>
                    Each round, one player after another plays a card and moves their marbles (see Possible Moves). If a player cannot move, all their cards get removed and they have to skip the rest of the round.
                    A player must always play a move if they are able to!
                    A round is over when no one has any cards left. <br/> Each round starts with a different amount of cards: The first round starts with 6 cards, then 5, 4, 3, 2 and then it starts over again with 6, 5, ...
                    <h2>Start</h2>
                    A starting move can be done with an Ace, a King or a Joker. With it, a marble can be moved on the marked starting position.
                    <br/>Important: A marble that lands on the starting position the first time cannot be sent home or overtaken!
                    <h2>Card Values</h2>
                    <div style={{display: "flex", flexDirection: "column", overflowX: "auto", width: "100%"}}>
                        <div  style={{display: "flex"}}>
                            <ImgCard height="150px" cardValue="2C" cardDistance="2" cardText='forwards'/>
                            <ImgCard height="150px" cardValue="3C" cardDistance="3" cardText='forwards'/>
                            <ImgCard height="150px" cardValue="5C" cardDistance="5" cardText='forwards'/>
                            <ImgCard height="150px" cardValue="6C" cardDistance="6" cardText='forwards'/>
                            <ImgCard height="150px" cardValue="8C" cardDistance="8" cardText='forwards'/>
                            <ImgCard height="150px" cardValue="9C" cardDistance="9" cardText='forwards'/>
                            <ImgCard height="150px" cardValue="10C" cardDistance="10" cardText='forwards'/>
                            <ImgCard height="150px" cardValue="QC" cardDistance="12" cardText='forwards'/>
                        </div>
                        <div  style={{display: "flex"}}>
                            <ImgCard height="150px" cardValue="4C" cardDistance="4" cardText='forwards or backwards'/>
                            <ImgCard height="150px" cardValue="7C" cardDistance="7" cardText='forwards, split between marbles'/>
                            <ImgCard height="150px" cardValue="AC" cardDistance="11" cardText='forwards, or leave start'/>
                            <ImgCard height="150px" cardValue="KC" cardDistance="13" cardText='forwards, or leave start'/>
                            <ImgCard height="150px" cardValue="JC" cardDistance="Switch" cardText='your marble with an enemy one'/>
                            <ImgCard height="150px" cardValue="Joker" cardDistance="Any" cardText='card can be emulated'/>
                        </div>
                    </div>
                    <h2>Sending Home</h2>
                    You can always overtake other marbles, but if you overtake them with a 7 or land ontop of them, the marble that was there before is sent back to the starting container. This is also the case if the marble is your own.
                    <h2>Goal Area</h2>
                    To join the goal area, a marble must move forwards over the starting position directly in the goal area. You cannot overtake (or move backwards) in the goal area.
                    <h2>Further Information</h2>
                    The rules are further explained <a href="http://www.dogspiel.info/images/pdfs/regeln/regeln.pdf" target="_blank">here</a>.
                </div>
            </div>

        </Modal>
    );

}

export default RulesPopup;