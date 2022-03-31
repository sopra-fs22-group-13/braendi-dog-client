/*
Parses and evaluates the WebSocket updates. Handle updates in the respective functions.
*/

export const parseUpdate = (rawUpdate) => {
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
    console.log("boardUpdate", extrainfo);
}

function updateCard(extrainfo)
{
    console.log("cardUpdate", extrainfo);
}

function updateTurn(extrainfo)
{
    console.log("turnUpdate", extrainfo);
}

function updateStart(extrainfo)
{
    console.log("startUpdate", extrainfo);
}

function updateWin(extrainfo)
{
    console.log("winUpdate", extrainfo);
}

function updateLobby(extrainfo)
{
    console.log("lobbyUpdate", extrainfo);
}