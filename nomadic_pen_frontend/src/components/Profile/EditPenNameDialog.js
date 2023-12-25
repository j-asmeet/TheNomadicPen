/* Author: Sreejith Nair */
import React, {useState} from 'react';
import * as MUI from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from '@mui/material';
import axios from "axios";
const EditPenNameDialog = ({ penName,setPenName,open,setOpen,handleClose}) => {
    const [newPenName, setNewPenName] = useState('');
    const [isPenNameTaken, setIsPenNameTaken] = useState(false);
    const handleUpdatePenName = () => {
        if (!newPenName || newPenName.trim() === '') {
            alert("Pen name cannot be left blank.");
            return;
        }

        const userEmail = localStorage.getItem("email");
        axios.post(`https://nomadic-pen.onrender.com/profile/updatePenName/${userEmail}`, { newPenName })
            .then((response) => {
                if (response.status === 200) {
                    console.log('penname response:',response.data);
                    const { isPenNameTaken } = response.data;
                    if (isPenNameTaken) {
                        setIsPenNameTaken(true);
                    } else {
                        alert('Pen name updated');
                        setPenName(newPenName);
                        handleClose();
                        setIsPenNameTaken(false);
                    }
                }
            })
            .catch((error) => {
                console.error('Error updating penName:', error);
                setIsPenNameTaken(false);
            });
    };
    return (
        <>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle sx={{padding: '16px', fontSize: '18px' }}>Update Pen Name</DialogTitle>
                <DialogContent className="password-change-form" sx={{ padding: '16px', fontSize: '14px' }}>
                    <TextField
                        label="Current Pen Name"
                        value={penName}
                        disabled
                    />
                    <TextField
                        label="New Pen Name"
                        value={newPenName}
                        onChange={(e) => setNewPenName(e.target.value)}
                    />
                    {isPenNameTaken && <Typography variant="caption" color="error">Pen name is already taken.</Typography>}
                </DialogContent>
                <DialogActions>
                    <MUI.Button variant="contained" onClick={handleClose}>Cancel</MUI.Button>
                    <MUI.Button variant="contained" onClick={handleUpdatePenName}>Update</MUI.Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default EditPenNameDialog;

