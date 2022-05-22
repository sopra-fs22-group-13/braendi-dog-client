import { Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import "styles/ui/RulesPopup.scss";
import ImgCard from './ImgCard';

export const RulesPopup = props => {
    return(
        <Modal
        keepMounted
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        >
            <div className='rules-popup box'>
                <div className="info-block">
                    <h1>Rules</h1>
                    <h2>Goal</h2>
                    To win you have to move all your marbles in the indicated goal room.
                    <h2>Process</h2>
                    Each round, one player after another plays a card and moves their marbles (see Possible Moves). If a player cannot move, all their cards get removed and they have to skip the rest of the round.
                    A player must always play a move if they are able to!
                    A round is over when no one has any cards left. Each round starts with a different amount of cards: The first round starts with 6 cards, then 5, 4, 3, 2 and then it starts over again with 6, 5, ...
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

export const MovePopup = props => {
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
                <h1>Make A Move</h1>
                Wait Until It's Your Turn (the indicator arrow will point to you).
                <h2>1. Select A Card</h2>
                Hover over your cards and select one with a left click. You can always select another card later.
                <h2>2. Move</h2>
                Select the marble you want to move, then select its destination.
                If you are happy with your move, click on "End Turn". <br/>
                If you would like to reselect the start and/or end positions, click on the selected position again to deselect it. Now you can click on your preferred start/end position.
                <h2>2.1 The 7 Card</h2>
                In order to split the card 7, do not click "End Turn". Click "Next" instead. Now, select your second move you want to do. If this is your last one, click "End Turn" otherwise click "Next" until your move is done.
                <h2>Invalid Moves</h2>
                The game will not warn you if you try to play an invalid move, but will deny you from doing so. You will have to try another move after playing an invalid move.
                </div>
            </div>

        </Modal>
    );

}