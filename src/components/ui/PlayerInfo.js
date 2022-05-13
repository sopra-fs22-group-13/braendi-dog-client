import React from 'react';
import PropTypes from "prop-types";
import 'styles/ui/PlayerInfo.scss';
import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import { addError, addInfo, addSuccess } from 'components/views/ErrorDisplay';
import Avatar from '@mui/material/Avatar';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { startListening, VoiceChatManager } from 'components/voice/voiceChat';


const PlayerInfo = props => {

    const [info, setInfo] = useState(null);
    useEffect(() => {
        async function fetchDataLobby() {
          try {
            const response = await api.get('/lobby/' + localStorage.getItem("lobbyId"), {
              headers: {
                  'Authorization': "Basic " + localStorage.getItem("token")
              }
          });
          setInfo(response.data);
          } catch (error) {
              addError("Could not fetch players", 5000);
              console.error("Details:", error);
            }
        }
      }, []);
    const [muteStateMe, setMuteStateMe] = useState(false);
    const [muteStateOthers, setMuteStateOthers] = useState(false);

    function muteMe() {
        setMuteStateMe(VoiceChatManager.toggleMuteSelf());
    }
    function muteOthers() {
        setMuteStateOthers(VoiceChatManager.toggleMuteOthers());
    }

    let myPlayer;
    let otherPlayers;



    myPlayer = (
        <div onClick={() => muteMe()}>
            <Avatar src="/resources/avatar/1.png" sx={{height: "7vh", width: "7vh"}}/>
            <div className= "playerinfo-container indicators">
                {muteStateMe ? <VolumeOffIcon/> : <VolumeUpIcon/> }
                <label> username </label>
            </div>
        </div>
    )


    otherPlayers = (
        <>
        <div onClick={() => muteOthers()}>
             <Avatar src="/resources/avatar/2.png" sx={{height: "7vh", width: "7vh"}}/>
             <div className= "playerinfo-container indicators">
                 {muteStateOthers ? <VolumeOffIcon/> : <VolumeUpIcon/> }
                 <label> username </label>
             </div>
         </div>
        <div onClick={() => muteOthers()}>
             <Avatar src="/resources/avatar/3.png" sx={{height: "7vh", width: "7vh"}}/>
             <div className= "playerinfo-container indicators">
                 {muteStateOthers ? <VolumeOffIcon/> : <VolumeUpIcon/> }
                 <label> username </label>
             </div>
         </div>
        <div onClick={() => muteOthers()}>
             <Avatar src="/resources/avatar/4.png" sx={{height: "7vh", width: "7vh"}}/>
             <div className= "playerinfo-container indicators">
                 {muteStateOthers ? <VolumeOffIcon/> : <VolumeUpIcon/> }
                 <label> username </label>
             </div>
         </div>
        </>
    )

    return(
        <div className="playerinfo-container">
            {myPlayer}
            {otherPlayers}
        </div>
    );
}

export default PlayerInfo;