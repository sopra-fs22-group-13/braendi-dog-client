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
Helper Function that subscribes to the WebSocket update and listens to it.
*/

import { getDomain } from 'helpers/getDomain';
import { parseUpdate } from './updateHandler';
import * as StompJs from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

class updateManager{

    static #socket = null;

    static #onMessage(message){
        if(message.body)
        {
            parseUpdate(message.body);
        }else
        {
            alert("empty message received!");
        }
    }

    static connectToPersonalUpdate()
    {
        if(updateManager.#socket != null)
        {
            console.log("already connected to a websocket. call disconnect() first.");
            return;
        }
    
        console.log("connecting WebSocket...");
    
        let subscribeDomain = `/user/${localStorage.getItem("token")}/queue/specific-user`;
        let domain =  getDomain() + "/gameupdates";
        updateManager.#socket = new StompJs.Client({
            connectHeaders: {
                login: 'user',
                passcode: 'password',
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
    
        updateManager.#socket.webSocketFactory = function () 
        {
            return new SockJS(domain);
        };
    
        updateManager.#socket.onConnect = function (frame) {
            const subscription = updateManager.#socket.subscribe(subscribeDomain, (message) => {updateManager.#onMessage(message)});
        };
    
        updateManager.#socket.onStompError = function (frame)
        {
            console.log(frame);
        }
    
        updateManager.#socket.activate();
    }

    static disconnectFromPersonalUpdate(){

        if(updateManager.#socket == null){
            console.log("Nothing to disconnect from...");
            return;
        }

        updateManager.#socket.deactivate();
        updateManager.#socket = null;
    }
}

export default updateManager;
