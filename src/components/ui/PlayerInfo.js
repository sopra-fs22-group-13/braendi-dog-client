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

    const [myUser, setMyUser] = useState(null);
    const [otherUsers, setOtherUsers] = useState(null);
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await api.get(`/game/${localStorage.getItem("gametoken")}/board`, {
              headers: {
                  'Authorization': "Basic " + localStorage.getItem("token")
              }
            });
            // gets coloMapping, sorts it and gets Users by ID
            let data = response.data.colorMapping;
            function getKeyByValue(value) {
                return Object.keys(data).find(key => data[key] === value);
            };
            let sortedTempArr = [getKeyByValue("GREEN"), getKeyByValue("BLUE"), getKeyByValue("RED"), getKeyByValue("YELLOW")];
            console.log(sortedTempArr);
            let others = new Array(0);
            let indexOffset = sortedTempArr.indexOf(localStorage.getItem("userID"))+1;
            let counter = 0;
            while (counter < 3){
                if(indexOffset === 4) { indexOffset = 0; }
                let otherUser = await api.get(`/users/${sortedTempArr[indexOffset]}`, {
                          headers: {
                              'Authorization': "Basic " + localStorage.getItem("token")
                          }
                        });
                others.push(otherUser.data)
                indexOffset++;
                counter++;
            }
            setOtherUsers(others);
            const me = await api.get(`/users/${localStorage.getItem("userID")}`, {
              headers: {
                  'Authorization': "Basic " + localStorage.getItem("token")
              }
            });
            setMyUser(me.data);

          } catch (error) {
              addError("Could not fetch players", 5000);
              console.error("Details:", error);
            }
        }
        fetchData();
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
//offset doesn't match, somehow attach to colormapping
    if (myUser !== null && otherUsers !== null){
        myPlayer = (
                <Player onClick={() => muteMe()} path={""+ myUser.avatar} volumeUp={muteStateMe} username={myUser.username}/>
        )

        otherPlayers = (
            <>
            {otherUsers.map(user => (
                <Player onClick={() => muteOthers()} path={""+ user.avatar} volumeUp={muteStateOthers} username= {user.username}/>
             ))}
            </>
        )
    }

    return(
        <div className="playerinfo-container">
            {myPlayer}
            {otherPlayers}
        </div>
    );
}

export default PlayerInfo;