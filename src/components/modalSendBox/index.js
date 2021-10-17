import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: 'relative',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonCancel:{
      position: 'absolute',
      right: 15,
      top: 10,
  }
}));

const ModalBox =({modalSend, setModalSend})=>{
    const classes = useStyles();
  
    const handleClose = () => {
        setModalSend(false);
    };
  
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={modalSend}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalSend}>
            <div className={classes.paper}>
              <IconButton onClick={handleClose} className={classes.buttonCancel}>
                    <CancelIcon/>
              </IconButton>
              <h3 id="transition-modal-title">Notificar alunos</h3>
              <TextField
                id="filled-multiline-static"
                label="messagem..."
                fullWidth
                multiline
                rows={4}
                defaultValue=""
                variant="filled"
             />
             <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={()=>{}}
            >
              Enviar
            </Button>
            </div>
          </Fade>
        </Modal>
      </div>
    );
}

export default ModalBox;