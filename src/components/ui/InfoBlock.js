import "styles/ui/InfoBlock.scss"

export const InfoBlockLeft = () => {
    return (
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
    );
}
export const InfoBlockRight = () => {
    return (
        <div className="info-block">
            <h1>Rules</h1>
            <h2>Goal</h2>
            To win you have to move all your marbles in the indicated goal room.
            <h2>Process</h2>
            Each round, one player after another plays a card and moves their marbles (see Possible Moves). If a player cannot move, all their cards get removed and they have to skip the rest of the round.
            A player must always play a move if they are able to!
            A round is over when no one has any cards left. Each round starts with a different amount of cards: <br/> starting with 6 cards, then 5-4-3-2-6-5...
            <h2>Start</h2>
            A starting move can be done with an Ace, a King or a Joker. With it, a marble can be moved on the marked starting position.
            <br/>Important: A marble that lands on the starting position the first time cannot be sent home or overtaken!
            <h2>Card Values</h2>
            Two to Ten: according to their name<br/>
            Four: backwards or forwards<br/>
            Seven: can be split between marbles<br/>
            Jack: switch your marble with another (can be one of your own)<br/>
            Queen: 12 points<br/>
            King: 13 Points or a starting move<br/>
            Ace: 1 or 11 Points of a starting move<br/>
            Joker: any of the mentioned card values
            <h2>Sending Home</h2>
            You can always overtake other marbles, but if you overtake them with a 7 or land ontop of them, the marble that was there before is sent back to the starting container. This is also the case if the marble is your own.
            <h2>Goal Area</h2>
            To join the goal area, a marble must move forwards over the starting position directly in the goal area. You cannot overtake (or move backwards) in the goal area.
            <h2>Further Information</h2>
            The rules are further explained <a href="http://www.dogspiel.info/images/pdfs/regeln/regeln.pdf" target="_blank">here</a>.
        </div>
    );
}