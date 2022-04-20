export class moveManager {

    static #selected_card = undefined;
    static #selected_starts = [];
    static #selected_ends = [];
    static #color = undefined;
    static #update_callbacks = {"NEW_CARD": [], "ADD_MOVE": [], "SEND_AND_RESET": []};
    static #callback_counter = 0;

    /**
     * sets a card to be selected for a move. resets everything but the color.
     * @param {string} card 
     */
    static selectCard(card)
    {
        moveManager.#selected_card = card;
        moveManager.#selected_ends = [];
        moveManager.#selected_starts = [];
    }

    static getSelectedCard()
    {
        return moveManager.#selected_card;
    }

    /**
     * 
     * @param {"RED" | "GREEN" | "BLUE" | "YELLOW"} color 
     */
    static setColor(color)
    {
        moveManager.#color = color;
    }

    static getColor()
    {
        return moveManager.#color;
    }

    static isMarbleTurn()
    {
        return moveManager.#selected_card? true : false;
    }

    /**
     * 
     * @param {-1 | int} start 
     * @param {int} end 
     * @param {boolean} startInGoal 
     * @param {boolean} endInGoal 
     */
    static addMove(start, end, startInGoal, endInGoal)
    {
        //basic validation
        if ((start != -1 && (start < 0 || start >= 64)) || (end < 0 || end >= 64)) return false;

        //extended validation
        if(!startInGoal) startInGoal = false;
        if(!endInGoal) endInGoal = false;

        if(startInGoal === true && start > 3) return false;
        if(endInGoal === true && end > 3) return false;
        
        //add
        moveManager.#selected_starts.push([start, startInGoal]);
        moveManager.#selected_ends.push([end, endInGoal]);
        moveManager.#sendCallback("ADD_MOVE");
    }

    /**
     * creates a request to move, returns the error code. (0 for success)
     * Resets the whole move.
     * 
     * ERROR:
     * 1: Empty move, request not sent.
     */
    static makeMoveRequest()
    {
        let errorcode = undefined;

        if (!moveManager.#color || !moveManager.selectCard || moveManager.#selected_ends.length == 0 || moveManager.#selected_starts.length == 0) errorcode = 1;
        
        //make request
        
        moveManager.#reset();
        return errorcode? errorcode : 0;
    }

    /**
     * This callback type is called `updateCallback` and is triggered when something meaningful changes.
     *
     * @callback updateCallback
     * @param {"NEW_CARD" | "ADD_MOVE" | "SEND_AND_RESET"} updateType
     */


    /**
     * Register a callback that will be called when something changes. change what to listen to by setting the appropriate flags to true.
     * @param {updateCallback} callback_function 
     * @param {boolean} NEW_CARD 
     * @param {boolean} ADD_MOVE 
     * @param {boolean} SEND_AND_RESET 
     * @returns {int} an Id to delete with later
     */
    static registerCallback(callback_function, NEW_CARD = false, ADD_MOVE = false, SEND_AND_RESET = false)
    {
        //unique id
        let id = moveManager.#callback_counter;
        moveManager.#callback_counter = id + 1;

        //save to list with type
        if(NEW_CARD){
            moveManager.#update_callbacks["NEW_CARD"].push([callback_function, id])
        }
        if(ADD_MOVE){
            moveManager.#update_callbacks["ADD_MOVE"].push([callback_function, id])
        }
        if(SEND_AND_RESET){
            moveManager.#update_callbacks["SEND_AND_RESET"].push([callback_function, id])
        }

        return id;
    }

    /**
     * Sends a callback to the registered functions
     * @param {"NEW_CARD" | "ADD_MOVE" | "SEND_AND_RESET"} updateType 
     */
    static #sendCallback(updateType)
    {
        let callbacks = [];
        if(updateType == "ADD_MOVE"){
            callbacks = moveManager.#update_callbacks["ADD_MOVE"];
        }
        if(updateType == "NEW_CARD"){
            callbacks = moveManager.#update_callbacks["NEW_CARD"];
        }
        if(updateType == "SEND_AND_RESET"){
            callbacks = moveManager.#update_callbacks["SEND_AND_RESET"];
        }

        callbacks.forEach(callback => {
            let callback_function = callback[0];
            callback_function(updateType);
        });
    }

    /**
     * Delete a callback
     * @param {int} id the id
     */
    static unregisterCallback(id){
        for (const [key, value] of Object.entries(moveManager.#update_callbacks)) 
        {
            let new_value = value.filter( el => el[1] !== id);
            moveManager.#update_callbacks[key] = new_value;
        }
    }

    static #reset()
    {
        moveManager.#selected_card = undefined;
        moveManager.#selected_ends = [];
        moveManager.#selected_starts = [];
        moveManager.#color = undefined;
    }

}

