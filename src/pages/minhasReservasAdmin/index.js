import React, { useState, useEffect } from 'react';
import { MinhasReservasTableAdmin } from '../../components/MinhasReservasTableAdmin';
import api from '../../services/api';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

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
    width: '30%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonCancel: {
    position: 'absolute',
    right: 15,
    top: 10,
  }
}));


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2AB083',
    },
    secondary: {
      main: '#333',
    },
  },
});

const Main = _ => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [studentsNot, setStudentsNot] = useState(['', '']);
  const user = JSON.parse(localStorage.getItem('@ifpi/user'));

  const handlerDialog = async (event, reserve) => {
    if (!open) {
      const response = await api.get(`reservationDetail/${reserve._id}`);
      setStudentsNot(response.data);
    }
    setOpen(!open);
  }

  const apiData = async _ => {
    try {
      const resp = await api.get(`/admin/reservations/${user._id}`);
      console.log(resp.data);
      setReservations(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    apiData();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <main style={{ flexGrow: 1, padding: '15px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 8px',
          minHeight: '64px',
        }}
        />
        <>
          <MinhasReservasTableAdmin
            handlerDialog={handlerDialog}
            title="Minhas Reservas"
            data={reservations}
            apiData={apiData}
          />

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handlerDialog}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <IconButton onClick={handlerDialog} className={classes.buttonCancel}>
                  <CancelIcon />
                </IconButton>
                <h3 id="transition-modal-title">Não irão comparecer</h3>
                {
                  studentsNot.length > 0 ?
                    studentsNot.map(student => {
                      return (
                        <div>
                          <Typography>{student.name}</Typography>
                        </div>
                      )
                    }) :
                    <Typography>Todos os alunos se compreteram em comparecer.</Typography>
                }
              </div>
            </Fade>
          </Modal>
        </>
      </main>
    </ThemeProvider>
  );
};

export default Main;