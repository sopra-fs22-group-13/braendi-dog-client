/*
Parses and evaluates the WebSocket updates. Handle updates by listening to the respective events on the document.
*/

export function parseUpdate(rawUpdate)
{
    let updateObject = JSON.parse(rawUpdate);

    switch(updateObject.type)
    {
        case "BOARD":
            updateBoard(updateObject.message);
            break;
        case "CARD":
            updateCard(updateObject.message);
            break;
        case "TURN":
            updateTurn(updateObject.message);
            break;
        case "START":
            updateStart(updateObject.message);
            break;
        case "WIN":
            updateWin(updateObject.message);
            break;
        case "LOBBY":
            updateLobby(updateObject.message);
            break;
        default:
            break;
    }
}


function updateBoard(extrainfo)
{
    alert("update!");
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