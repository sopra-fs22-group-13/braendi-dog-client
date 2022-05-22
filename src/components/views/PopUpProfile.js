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
    return { background: wins === 0 ? 'linear-gradient(90deg, rgba(231,111,109,1) 1%, rgba(247,248,241,1) 1%, rgba(247,248,241,1) 41%, rgba(225,203,192,1) 90%)' : 'linear-gradient(90deg, rgba(165,231,109,1) 1%, rgba(247,248,241,1) 1%, rgba(247,248,241,1) 41%, rgba(200,234,191,1) 90%)'};
}

function createData(date, wins, inGoal) {
    return { date, wins, inGoal };
}

const rows = [
    createData('10.05.2022', 1, 4),
    createData('10.05.2022', 0, 3),
    createData('10.05.2022', 1, 4),
    createData('10.05.2022', 0, 2),
    createData('10.05.2022', 0, 1),
    createData('10.05.2022', 1, 4),
    createData('10.05.2022', 0, 3),

];

const PopUpProfile = props => {
    let userId = props.userId;
    const [user,setUser]= useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [avatar, setAvatar] = React.useState('');
    const [errorFetchData,setErrorFetchData] = useState(null)

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

    return (
        <div>
            <div style={{fontSize: '24px'}} onClick={handleOpen}>{user.username}</div>
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
                            <div className="popup-profilepage containerTitle">
                                <Avatar  alt="Remy Sharp" src={avatar} sx={{width:90, height:90}} />
                                <div className="popup-profilepage userName">
                                    {user.username}
                                </div>
                            </div>
                            <div className="popup-profilepage containerUserInfo">
                                <div className="popup-profilepage userInfoPopUp">
                                    Description: {user.description}
                                </div>
                                <div className="popup-profilepage userInfoPopUp">
                                    Total Wins: {user.wins}
                                </div>
                                <div className="popup-profilepage userInfoPopUp">
                                    Total goals: {user.gotInGoals}
                                </div>

                            </div>
                            {errorFetchData}
                        </Grid>
                        <Grid item xs={6} sx={{textAlign: 'center'}}>
                            <div className="table">
                                <div className="table tableName">
                                    Games played
                                </div>
                                <TableContainer  component={Paper} sx={{maxHeight: 500}}>
                                    <Table stickyHeader aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Date</TableCell>
                                                <TableCell align="right">Wins</TableCell>
                                                <TableCell align="right">InGoal</TableCell>

                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                    key={row.date}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, ...getStripedStyle(row.wins) }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.date}
                                                    </TableCell>
                                                    <TableCell align="right">{row.wins}</TableCell>
                                                    <TableCell align="right">{row.inGoal}</TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
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

