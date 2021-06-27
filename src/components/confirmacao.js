import React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText} from "@material-ui/core";

const Confirmacao = ({open, message, positive, negative, onClose, onAceept}) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {negative}
        </Button>
        <Button onClick={onAceept} color="primary" autoFocus>
          {positive}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Confirmacao;