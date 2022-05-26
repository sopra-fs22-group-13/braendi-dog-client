import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import { Button } from 'components/ui/Button';
import Grid from "@mui/material/Grid";
import Modal from '@mui/material/Modal';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import 'styles/views/PopUpProfile.scss';
import { api } from "../../helpers/api";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: '#F7F8F1',
    border: '2px solid #C7CB95',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

function getStripedStyle (wins) {
    return { background: wins === false ? 'linear-gradient(90deg, rgba(231,111,109,1) 1%, rgba(247,248,241,1) 1%, rgba(247,248,241,1) 41%, rgba(225,203,192,1) 90%)' : 'linear-gradient(90deg, rgba(165,231,109,1) 1%, rgba(247,248,241,1) 1%, rgba(247,248,241,1) 41%, rgba(200,234,191,1) 90%)'};
}


function transformDate(date){
    return (new Date(date)).toLocaleDateString()
}



const PopUpProfile = props => {
    let userId = props.userId;
    let fontSize= props.fontSize;
    const [user,setUser]= useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [avatar, setAvatar] = React.useState('');
    const [errorFetchData,setErrorFetchData] = useState(null)
    const [gameHistoryList, setGameHistoryList]= useState([]);


    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get("/users/"+userId, {
                    headers: {
                        'Authorization': "Basic " + localStorage.getItem("token")
                    }
                });

                setUser(response.data);
                setAvatar('resources/avatar/'+response.data.avatar+'.png');

                const responseGames = await api.get("/users/"+userId+"/history", {
                    headers: {
                        'Authorization': "Basic " + localStorage.getItem("token")
                    }
                });
                setGameHistoryList(responseGames.data)

            } catch (error) {
                setErrorFetchData(
                    <div className="errors">
                        Sorry something went wrong during the fetching the data
                    </div>
                )
            }
        }
        fetchData();
    }, []);

    let contentStory = <TableBody> <TableRow> <TableCell > No recorded game</TableCell>  </TableRow> </TableBody>

    if (gameHistoryList.length!==0){

        contentStory = (
            <TableBody>
                {gameHistoryList.map((game) => (
                    <TableRow
                        key={game.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, ...getStripedStyle(game.won) }}
                    >
                        <TableCell component="th" scope="row">
                            {transformDate(game.startDate)}
                        </TableCell>
                        <TableCell align="right">{game.goals}</TableCell>

                    </TableRow>
                ))}
            </TableBody>
        );
    }

    return (
        <div>
            <div style={{fontSize: '24px', cursor: 'pointer'}} onClick={handleOpen}>{user.username}</div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={2} sx={{textAlign: 'center', justifyContent: 'center'}} >
                        <Grid item xs={6} sx={{justifyContent: 'center'}}>
                            <div className="popup-profilePage containerTitle">
                                <Avatar  alt="Remy Sharp" src={avatar} sx={{width:100, height:100}} />
                                <div className="popup-profilePage userName">
                                    {user.username}
                                </div>
                            </div>
                            <div className="popup-profilePage containerUserInfo">
                                <div className="popup-profilePage userInfoPopUp">
                                    Description: <br/>{user.description}
                                </div>
                                <div className="popup-profilePage userInfoPopUp">
                                    Total Wins: {user.wins}
                                </div>
                                <div className="popup-profilePage userInfoPopUp">
                                    Total goals: {user.gotInGoals}
                                </div>

                            </div>
                            {errorFetchData}
                        </Grid>
                        <Grid item xs={6} sx={{textAlign: 'center'}}>
                            <div className="table">
                                <div className="table tableName">
                                    Game History
                                </div>
                                <TableContainer  component={Paper} sx={{maxHeight: 500}}>
                                    <Table stickyHeader aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Date</TableCell>

                                                <TableCell align="right">InGoal</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        {contentStory}
                                    </Table>
                                </TableContainer>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

PopUpProfile.propTypes = {
    userId: PropTypes.number,
};

export default PopUpProfile;

