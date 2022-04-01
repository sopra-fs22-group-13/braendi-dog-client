import SendBirdCall from "sendbird-calls" 

let APP_ID = "none";
let USER_AUTH = "none";
let USER_ID = "none";
let ROOM_ID = "none";
let currentRoom = null;

export function startListening()
{        
    document.addEventListener("startUpdate", (event) => {
        APP_ID = event.detail.app_id;
        USER_AUTH = event.detail.user_auth;
        USER_ID = event.detail.user_id;
        ROOM_ID = event.detail.room_id;

        //connect
        connectToVc();
    });
}

async function connectToVc()
{
    SendBirdCall.init(APP_ID);

    const authOptions = {userId: USER_ID, accessToken: USER_AUTH};
    console.log(authOptions);
    let result , error = await SendBirdCall.authenticate(authOptions);
    if(error)
    {
        console.log(error);
    }

    // Establishing websocket connection.
    await SendBirdCall.connectWebSocket()

    let room = await SendBirdCall.fetchRoomById(ROOM_ID).catch(e => {
        console.log(e.message);
        alert("room does not exist!");
    });  

    console.log(room);

    // `room` with the identifier `ROOM_ID` is fetched from Sendbird Server.
    const enterParams = {
        videoEnabled: false,
        audioEnabled: true
    }

    let audio = document.createElement("audio");
    audio.id = "audio-speaker"
    audio.autoplay = true;
    document.getElementById("root").appendChild(audio);

    room.enter(enterParams).then(() => {
        room.setAudioForLargeRoom(document.getElementById("audio-speaker"));
        room.localParticipant.unmuteMicrophone()
        room.localParticipant.startVideo()
        });

    currentRoom = room;
    console.log(room);
}

function disconnectFromVc()
{
    try {
        currentRoom.exit() // Participant has exited the room successfully.
    } catch (error) {
        alert("could not exit the room:" + error.message.toString());
    }
}
