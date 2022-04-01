/*
Helper Function that subscribes to the WebSocket update and listens to it.
*/

import { getDomain } from 'helpers/getDomain';
import { parseUpdate } from './updateHandler';
import * as StompJs from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

let socket = null;
let onMessage = function (message)
{
    if(message.body)
    {
        parseUpdate(message.body);
    }else
    {
        alert("empty message received!");
    }
}

export function disconnect()
{
    socket.disconnect();
    socket = null;
}

export function connectToPersonalUpdate()
{
    if(socket != null)
    {
        console.log("already connected to a websocket. call disconnect() first.");
        return;
    }

    console.log("connecting WebSocket...");

    if(localStorage.getItem("token1") == null)
    {
        localStorage.setItem("token1", "123");
        alert("failed");
        return;
    }

    let subscribeDomain = `/user/${localStorage.getItem("token1")}/queue/specific-user`;
    let domain =  getDomain() + "/gameupdates";
    console.log(domain);
    const client = new StompJs.Client({
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

    client.webSocketFactory = function () 
    {
        return new SockJS(domain);
    };

    client.onConnect = function (frame) {
        const subscription = client.subscribe(subscribeDomain, (message) => {onMessage(message)});
    };

    client.onStompError = function (frame)
    {
        console.log(frame);
    }

    client.activate();
}
