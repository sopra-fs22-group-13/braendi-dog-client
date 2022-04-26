import SendBirdCall from "sendbird-calls" 

export class VoiceChatManager{
    static #APP_ID = "none";
    static #USER_AUTH = "none";
    static #USER_ID = "none";
    static #ROOM_ID = "none";
    static #currentRoom = null;
    static #listening = false;

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
            alert("room does not exist!");
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
            room.localParticipant.unmuteMicrophone()
            room.localParticipant.startVideo()//not necessary (?i think?)
            });

        VoiceChatManager.#currentRoom = room;
        console.log(room);
    }


    /**
     * Disconnects from the currently connected room, if possible.
     */
    static disconnectFromVc()
    {
        try {
            VoiceChatManager.#currentRoom.exit() // Participant has exited the room successfully.
        } catch (error) {
            alert("could not exit the room:" + error.message.toString());
        }
    }

}


