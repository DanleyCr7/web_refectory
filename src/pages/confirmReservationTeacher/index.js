import React, { useEffect } from 'react';
import { useState } from 'react';
import MaterialTable from 'material-table';
import { createTheme } from '@material-ui/core';
import api from '../../services/api';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import settingsText from '../../config/settingsText';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme)=>({
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
  buttonCancel:{
      position: 'absolute',
      right: 15,
      top: 10,
  },
  button: {
    backgroundColor: '#17871d',
    color: '#fff',
    marginTop: 15,
  },

  buttonBack: {
    backgroundColor: '#ccc',
    color: 'black',
    marginTop: 15,
    marginLeft: 10,
  },

  margin: {
    marginTop: 80,
    paddingLeft: 15
  },

  textField: {
    width: '90%',
  },
}));

export default function Confirm({ title }) {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [studentsNot, setStudentsNot] = useState([]);
  const user = JSON.parse(localStorage.getItem('@ifpi/user'));

  const handlerDialog = _ => {
    setOpen(!open);
  }
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2AB083',
      },
      secondary: {
        main: '#333',
      },
    },
  });
  
  const [columns] = useState([

    { title: 'Aluno', field: `name`, filtering: false },
    { title: 'Matrícula', field: 'code', filtering: false },
    { title: 'Curso', field: 'id_class.course.name', filtering: false },
    { title: 'Turma', field: 'id_class.description',filtering: false },
    { title: 'Aprovado', field: 'permission',filtering: false },
    { title: 'Confirmação', field: `confirm`,filtering: false },
  ]);

  const apiData = async _ => {
    try {
      const resp = await api.get(`/students/class/${id}`);
      console.log(resp.data);
      setStudents(resp.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    apiData();
  }, [])

  const doneSelection = async (event, students) => {    
    const promisesList = await students.map(async student => {
        studentsNot.push(student._id);
    });

    handlerDialog();

    await Promise.all(promisesList).then(resp => {
      console.log('cabou o put');
      apiData();
    });
  };

  const back = () => {
    history.push('/Turmas');
  }
  
  const register = async (event) => {
    event.preventDefault();
    const class_id = id;
    const teacher_id = user._id;
    const dateInf = event.target.date.value;
    if(dateInf){
      await api.post('/class/reservation', {
        class_id, teacher_id, data: dateInf, studentsNot
      }).then(resp => {
        alert(resp?.data?.message);
        console.log(resp?.data?.message)
        window.location.href = "/Turmas";
      }).catch(error => {
        alert('Ops, aconteceu algum erro no agendamento!');
      })
    } else {
      alert('Informe a data')
    }
  }

  return (
     <>
      <main style={{ flexGrow: 1, padding: '15px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 8px',
          minHeight: '64px',
        }}
        />
     <MaterialTable 
        style={{backgroundColor: '#fff', }}
        title='Alunos'
        localization={settingsText}
        columns={columns}
        data={students}
        actions={[{ 
          icon: 'done_all', 
          tooltip: 'Remover alunos',
          backgroundColor: '#2AB083',
          onClick: doneSelection,
        },
        { 
          icon: 'check', 
          tooltip: 'Todos os alunos',
          backgroundColor: '#2AB083',
          isFreeAction: true,
          onClick: handlerDialog,
        },
        
        ]}
        styles={{}}
          localization={{
            body: {
              addTooltip: 'Fazer reserva'
            },
            toolbar: {
              nRowsSelected: 'Alunos removidos: {0}',
            },
          }}
        options={{
          selection: true,
          filtering: true,
          actionsColumnIndex: -1,
          selectionProps: rowData => ({
            color: 'primary',
          }),
          headerStyle: {
            backgroundColor: '#2FA23B',
            color: '#eee',
            fontSize: '1em',
          },
        }}
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
                <CancelIcon/>
             </IconButton>
              <h3 id="transition-modal-title">Informe a data</h3>
              <form onSubmit={register}>
              <Grid style={{display: "flex", flexDirection: 'row', alignItems: 'center'}}>
              <TextField
                style={{ margin: '15px 10px' }}
                id="date"
                name="data"
                label="Data"
                type="date"
                InputLabelProps={{
                  shrink: true,
                  required: true
                }}
              />
              <Button type="submit" className={classes.button} >Confirmar</Button>
              </Grid>
            </form>
            </div>
          </Fade>
        </Modal>
     </main>
    </>
  );
}