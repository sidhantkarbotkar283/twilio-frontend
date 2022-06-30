import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "../hooks/context/GlobalContext";

export default function AlertDialog() {
  const { open, setOpen } = useContext();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Paritipant wants to join"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            participant
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Remove</Button>
          <Button onClick={handleClose} autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
