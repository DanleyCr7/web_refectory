import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider } from '@material-ui/styles';
import api from '../services/api';
import {  Button, createMuiTheme, IconButton, Modal } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

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

export const ClassTable = ({ classes, apiData, title }) => {
  const history = createBrowserHistory();

  const user = JSON.parse(localStorage.getItem('@ifpi/user'));

  const [classSelect, setClassSelect] = useState({});
  const [open, setOpen] = useState(false);
  const classesNa = useStyles();

  const deleteClasses = async (event, rowData) => {
      api.delete(`/class/${rowData._id}`).then(() => {
        apiData();
      })
  }

  const handleDialog = () => {
    setOpen(!open);
  };

  const reservationClass = async (event, rowData) => {
    history.push(`/class/reservation/${rowData._id}`);
  }

  const editClasses = async (event, rowData) => {
    const id = rowData._id;
    history.push(`/class/edit/${id}`);
  }

  const actionAdmin = [
    {
      icon: 'delete',
      tooltip: 'Deletar turma',
      onClick: deleteClasses,
    },
    {
      icon: 'edit',
      tooltip: 'Editar turma',
      onClick: editClasses,
    },
    {
      icon: 'done',
      tooltip: 'Reservar turma',
      onClick: reservationClass,
    }
  ]

  const actionsTeacher = [
    {
      icon: 'done',
      tooltip: 'Reservar turma',
      onClick: reservationClass,
    }
  ]

  return (
    <div>
      <MaterialTable
        title={
          title
        }
        columns={[
          { title: 'Ano', field: 'year', filtering: false },
          { title: 'Turno', field: 'shift', filtering: false },
          { title: 'Curso', field: 'course.name', filtering: false },
        ]}
        data={classes}
        actions={user.permission == 'admin' ? actionAdmin : actionsTeacher}
        options={{
          filtering: true,
          selectionProps: _ => ({
            color: 'primary',
          }),
          headerStyle: {
            backgroundColor: '#2FA23B',
            color: '#eee',
            fontSize: '1em',
          },
        }}
      >
      </MaterialTable>
      <Modal
          open={open}
        >
            <div className={classesNa.paper}>
              <IconButton onClick={handleDialog} className={classesNa.buttonCancel}>
                    <Cancel/>
              </IconButton>
              <h3 id="transition-modal-title">Listar alunos</h3>
             
             <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classesNa.submit}
            >
              Enviar
            </Button>
            </div>
        </Modal>
      </div>
    
  )
};
