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

import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Avatar from '@mui/material/Avatar';
import { addError } from 'components/views/ErrorDisplay';
import { VoiceChatManager } from 'components/voice/voiceChat';
import { api } from 'helpers/api';
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import 'styles/ui/PlayerInfo.scss';


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