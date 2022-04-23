import "styles/ui/InfoBlock.scss"

export const InfoBlockLeft = () => {
    return (
        <div className="info-block">
            <h1>Make A Move</h1>
            <h2>1. Wait Unil It's Your Turn</h2>
            The other players can make moves until the indicator arrow points to you (bottom).
            <h2>2. Select A Card</h2>
            Hover over your cards and select one with a left click. You can always select another card later.
            <h2>3. Move</h2>
            Select the marble you want to move, then select its destination.
            If you are happy with your move, click on "End Turn". <br/>
            If you would like to reselect the start and/or end positions, click on the selected position again to deselect it. Now you can click on your preferred start/end position.
            <h2>3.1 The 7 Card</h2>
            Start your move as described in 3. If you want to split you 7, do not click "End Turn". Click "Next" instead. Now, select your second move you want to do. If this is your last one, click "End Turn" otherwise click "Next".
            You will not be able to edit a move after you clicked "Next". If you want to do a different move, you can make sure the move is invalid and then try again.
            <h2>4. Invalid Moves</h2>
            The game will not warn you if you try to play an invalid move, but will deny you from doing so.
        </div>
    );
}
export const InfoBlockRight = () => {
    return (
        <div className="info-block">
            <h1>Rules</h1>
            <h2>1. Goal</h2>
            You win if you have moved all your marbles in the indicated goal room.
            <h2>2. Process</h2>
            Each round, one player after another plays a card and moves their marbles (see 3. Possible Moves). If a player cannot move, all their cards get removed and the player needs to wait until a new round starts.
            A player must always play a move if they are able to!
            A round is over when noone has any cards left. Each round starts with a different amount of cards: 6-5-4-3-2-6-5... 
            <h2>3. Possible Moves</h2>
            <h2>3.1 Start</h2>
            A starting move can be done with an Ace or a King. With it, a marble can be moved on the marked starting position.
            <br/>Important: A marble that lands on the starting position the first time cannot be sent home (see 4. Sending Home) or overtaken!
            <h2>3.2 Card Values</h2>
            A regular move can be done according to these values:<br/>
            Two to Ten: according to their name<br/>
            Four: backwards or forwards<br/>
            Seven: can be split between marbles<br/>
            Jack: switch your marble with another (can be one of your own)<br/>
            Queen: 12 points<br/>
            King: 13 Points or a starting move<br/>
            Ace: 1 or 11 Points of a starting move<br/>
            Joker: any of the mentioned card values
            <h2>4. Sending Home</h2>
            You can always overtake other marbles, but if you overtake them with a 7 or land ontop of them, the marble that was there before is sent back to the starting container. This is also the case if the marble is your own.
            <h2>5. Goal Area</h2>
            To join the goal area, a marble must move forwards over the starting position directly in the goal area. You cannot overtake (or move backwards) in the goal area.
            <h2>6. Further Information</h2>
            The rules are further explained <a href="http://www.dogspiel.info/images/pdfs/regeln/regeln.pdf" target="_blank">here</a>.
        </div>
    );
}