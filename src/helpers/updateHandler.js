/*
Parses and evaluates the WebSocket updates. Handle updates by listening to the respective events on the document.
*/

export function parseUpdate(rawUpdate)
{
    let updateObject = JSON.parse(rawUpdate);
    let message = updateObject.message? updateObject.message : "{}";
    switch(updateObject.type)
    {
        case "BOARD":
            updateBoard(message);
            break;
        case "CARD":
            updateCard(message);
            break;
        case "TURN":
            updateTurn(message);
            break;
        case "START":
            updateStart(message);
            break;
        case "WIN":
            updateWin(message);
            break;
        case "LOBBY":
            updateLobby(message);
            break;
        case "INVITE":
            updateInvite(message);
            break;
        default:
            break;
    }
}


//each function here dispatches the associated event.
//yes this could be done in one function, but is split for now if we need event specific logic.

function updateBoard(extrainfo)
{
    const event = new CustomEvent('boardUpdate', { detail: JSON.parse(extrainfo)});
    document.dispatchEvent(event);
}

function updateCard(extrainfo)
{
    console.log("cardUpdate", extrainfo);
    const event = new CustomEvent('cardUpdate', { detail: JSON.parse(extrainfo)});
    document.dispatchEvent(event);
}

function updateTurn(extrainfo)
{
    console.log("turnUpdate", extrainfo);
    const event = new CustomEvent('turnUpdate', { detail: JSON.parse(extrainfo)});
    document.dispatchEvent(event);
}

function updateStart(extrainfo)
{
    console.log("startUpdate", extrainfo);
    const event = new CustomEvent('startUpdate', { detail: JSON.parse(extrainfo)});
    document.dispatchEvent(event);
}

function updateWin(extrainfo)
{
    console.log("winUpdate", extrainfo);
    const event = new CustomEvent('winUpdate', { detail: JSON.parse(extrainfo)});
    document.dispatchEvent(event);
}

function updateLobby(extrainfo)
{
    console.log("lobbyUpdate", extrainfo);
    const event = new CustomEvent('lobbyUpdate', { detail: JSON.parse(extrainfo)});
    document.dispatchEvent(event);
}

function updateInvite(extrainfo)
{
    console.log("inviteUpdate", extrainfo);
    const event = new CustomEvent('inviteUpdate', { detail: JSON.parse(extrainfo)});
    document.dispatchEvent(event);
}