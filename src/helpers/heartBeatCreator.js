import { api } from "./api";

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
        const response = await api.post("/heartbeat", {type: heartBeatCreator.#type}, {
            headers: {
                'Authorization': "Basic " + localStorage.getItem("token")
            }
        });
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