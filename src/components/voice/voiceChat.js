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

import { addError } from "components/views/ErrorDisplay";
import SendBirdCall from "sendbird-calls" 

export class VoiceChatManager{
    static #APP_ID = "none";
    static #USER_AUTH = "none";
    static #USER_ID = "none";
    static #ROOM_ID = "none";
    static #currentRoom = null;
    static #listening = false;
    static #unsubscribe = null;
    static #selfMuted = false;
    static #othersMuted = false;

    /**
     * starts listening to the startUpdate event that should be triggered when a game starts.
     * (Remember that the updateHandler needs to be present somewhere to dispatch this event.)
     */
    static startListening()
    {   
        if(!VoiceChatManager.#listening)
        {
            document.addEventListener("voiceUpdate", (event) => {
                VoiceChatManager.#APP_ID = event.detail.app_id;
                VoiceChatManager.#USER_AUTH = event.detail.user_auth;
                VoiceChatManager.#USER_ID = event.detail.user_id;
                VoiceChatManager.#ROOM_ID = event.detail.room_id;
                //connect
                VoiceChatManager.connectToVc();
            });
            VoiceChatManager.#listening = true;

        }else
        {
            console.log("already listening to voice update");
        }

    }


    /**
     * this function expects the 4 values in this file scope to be valid.
     * It then tries to connect to a voiceChat room with the given credentials and start the microphone automatically.
     */
    static async connectToVc()
    {
        SendBirdCall.init(VoiceChatManager.#APP_ID);

        const authOptions = {userId: VoiceChatManager.#USER_ID, accessToken: VoiceChatManager.#USER_AUTH};
        console.log(authOptions);
        let result , error = await SendBirdCall.authenticate(authOptions);
        if(error)
        {
            console.log(error);
        }

        // Establishing websocket connection.
        await SendBirdCall.connectWebSocket()

        let room = await SendBirdCall.fetchRoomById(VoiceChatManager.#ROOM_ID).catch(e => {
            console.log(e.message);
            addError("VC: room does not exist so we cannot enter.");
        });  

        console.log(room);

        // "room" with the identifier `ROOM_ID` is fetched from Sendbird Server.
        const enterParams = {
            videoEnabled: false,
            audioEnabled: true
        }

        //make a new audio object if it doesnt exist yet
        if(document.getElementById("audio-speaker") == null)
        {
            let audio = document.createElement("audio");
            audio.id = "audio-speaker"
            audio.autoplay = true;
            document.getElementById("root").appendChild(audio);
        }

        room.enter(enterParams).then(() => {
            room.setAudioForLargeRoom(document.getElementById("audio-speaker")); //reference the audio DOMobject
            room.localParticipant.unmuteMicrophone();
            });

        VoiceChatManager.#unsubscribe = room.on("deleted", () => {
            VoiceChatManager.#currentRoom = null;
            if(VoiceChatManager.#unsubscribe != null) {
                VoiceChatManager.#unsubscribe();
                VoiceChatManager.#unsubscribe = null;
            }
        });

        VoiceChatManager.#currentRoom = room;
        console.log(room);
    }


    /**
     * Disconnects from the currently connected room, if possible.
     */
    static disconnectFromVc()
    {
        if(VoiceChatManager.#currentRoom == null) return
        try {
            VoiceChatManager.#currentRoom.exit(); // Participant has exited the room successfully.
            if(VoiceChatManager.#unsubscribe != null) {
                VoiceChatManager.#unsubscribe();
                VoiceChatManager.#unsubscribe = null;
            }
        } catch (error) {
            addError("could not exit the room:" + error.message.toString());
        }
    }

    /**
     * Toggles the microphone mute state of self
     * @returns Now muted? bool
     */
    static toggleMuteSelf()
    {
        if(VoiceChatManager.#currentRoom == null)
        {
            addError("could not toggle mute of self");
            return VoiceChatManager.#selfMuted;
        }

        if(VoiceChatManager.#selfMuted)
        {
            VoiceChatManager.#currentRoom.localParticipant.unmuteMicrophone();
            VoiceChatManager.#selfMuted = false;
        }else
        {
            VoiceChatManager.#currentRoom.localParticipant.muteMicrophone();
            VoiceChatManager.#selfMuted = true;
        }

        return VoiceChatManager.#selfMuted;
    }

    /**
     * Toggles the microphone mute state of all other participants simoultaniously
     * @returns Now muted? bool
     */
    static toggleMuteOthers()
    {
        try{
            let audioObj = document.getElementById("audio-speaker");
            
            if(VoiceChatManager.#othersMuted)
            {
                audioObj.muted = false;
                VoiceChatManager.#othersMuted = false;

            }else
            {
                audioObj.muted = true;
                VoiceChatManager.#othersMuted = true;
            }
        }catch{
            addError("could not toggle mute of others");
        }
        return VoiceChatManager.#othersMuted;
    }

}


