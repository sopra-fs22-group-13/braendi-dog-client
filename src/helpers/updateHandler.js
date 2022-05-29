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
        case "VOICE":
            updateVoice(message);
            break;
        case "GAME_CLOSED":
            updateGame(message);
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

function updateVoice(extrainfo)
{
    console.log("voiceUpdate", extrainfo);
    const event = new CustomEvent('voiceUpdate', { detail: JSON.parse(extrainfo)});
    document.dispatchEvent(event);
}

//TODO update game from websocket, not implemented correctly yet
function updateGame(extrainfo)
{
    console.log("gameUpdate", extrainfo);
    const event = new CustomEvent('gameUpdate', { detail: JSON.parse(extrainfo)});
    document.dispatchEvent(event);
}