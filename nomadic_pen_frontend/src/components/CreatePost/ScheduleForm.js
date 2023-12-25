/* Author: Meet Sinojia */

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ScheduleForm = ({ open, onClose, onSchedule }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSchedule = () => {
    if (selectedDate) {
      onSchedule(selectedDate);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Schedule Post</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Select Date and Time"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSchedule}>
          Schedule
        </Button>
        <Button variant="contained" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleForm;
