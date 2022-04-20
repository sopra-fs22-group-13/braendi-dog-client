export class moveManager {

    static #selected_card = undefined;
    static #selected_starts = [];
    static #selected_ends = [];
    static #color = undefined;

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
        if ((start != 1 && (start < 0 || start >= 64)) || (end != 1 && (end < 0 || end >= 64))) return false;

        //extended validation
        if(!startInGoal) startInGoal = false;
        if(!endInGoal) endInGoal = false;

        if(startInGoal === true && start > 3) return false;
        if(endInGoal === true && end > 3) return false;
        
        //add
        moveManager.#selected_starts.push([start, startInGoal]);
        moveManager.#selected_ends.push([end, endInGoal]);
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

    static #reset()
    {
        moveManager.#selected_card = undefined;
        moveManager.#selected_ends = [];
        moveManager.#selected_starts = [];
        moveManager.#color = undefined;
    }

}

