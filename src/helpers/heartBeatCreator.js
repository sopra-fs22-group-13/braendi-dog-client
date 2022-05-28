/*
    dog-client is the client component of an online web implementation of dog.
    Copyright (C) 2022  Luca Zwahlen

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

import { api } from "./api";
import updateManager from "./updateManager";


function logout () {
    updateManager.disconnectFromPersonalUpdate();
    localStorage.clear();
    window.location.replace("./login")
}

export class heartBeatCreator{
    static #type = "NOT_SET";
    static #running = false;
    static #interval_id = null;

    /**
     * 
     * @param {"NOT_SET" | "LOBBY" | "GAME" | "MENU"} type sets the type of heartBeat we will send.
     */
    static setType(type){
        heartBeatCreator.#type = type;
        heartBeatCreator.#startHeartBeat();
    }

    static #startHeartBeat()
    {
        if(heartBeatCreator.#running) return;
        
        heartBeatCreator.#interval_id = setInterval(this.#intervalCallback, 2000);
        heartBeatCreator.#running = true;
    }

    static async #intervalCallback()
    {
        //make the heartbeat with a type
        try{
            const response = await api.post("/heartbeat", {type: heartBeatCreator.#type}, {
                headers: {
                    'Authorization': "Basic " + localStorage.getItem("token")
                }
            });
        }catch(exception)
        {
            //oh oh, we should probably log out...
            logout();
        }

    }

    static killHeartBeat()
    {
        if(heartBeatCreator.#interval_id != null && heartBeatCreator.#running == true)
        {
            clearInterval(heartBeatCreator.#interval_id);
            heartBeatCreator.#running = false;
            heartBeatCreator.#interval_id = null;
        }
    }
}