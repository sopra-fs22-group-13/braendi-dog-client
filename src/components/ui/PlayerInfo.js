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


const Player = props => {

    return(
        <div {...props}>
            <Avatar src={process.env.PUBLIC_URL + "/resources/avatar/" + props.path + ".png"} sx={{height: "7vh", width: "7vh"}}/>
            <div className= "playerinfo-container indicators">
                {props.volumeUp ? <VolumeOffIcon/> : <VolumeUpIcon/>}
                <label> {props.username} </label>
            </div>
        </div>
    );
}

Player.propTypes = {
  path: PropTypes.string,
  volumeUp: PropTypes.bool,
  username: PropTypes.string
};

const PlayerInfo = props => {

    const [users, setUsers] = useState(null);
    useEffect(() => {
        async function fetchDataLobby() {
          try {
            const response = await api.get('/lobby/' + localStorage.getItem("lobbyId"), {
              headers: {
                  'Authorization': "Basic " + localStorage.getItem("token")
              }
          });
          setUsers(response.data);
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

    //<Player onClick={() => muteMe()} path={""+ users[0].avatar} volumeUp={muteStateMe} username={users[0].username}/>
    myPlayer = (
            <Player onClick={() => muteMe()} path={""+1} volumeUp={muteStateMe} username="test"/>
    )


    /* {users.slice(1).map(user => (
        <Player onClick={() => muteOthers()} path={""+ user.avatar} volumeUp={muteStateOthers} username= {user.username}/>
     ))}*/ 
    otherPlayers = (
        <>
        <Player onClick={() => muteOthers()} path={""+2} volumeUp={muteStateOthers} username="test"/>
        <Player onClick={() => muteOthers()} path={""+3} volumeUp={muteStateOthers} username="test"/>
        <Player onClick={() => muteOthers()} path={""+4} volumeUp={muteStateOthers} username="mesmmongna"/>
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