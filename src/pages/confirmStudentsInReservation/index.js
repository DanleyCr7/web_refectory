import React, { useState, useEffect } from 'react';
import CountMeal from '../../components/countMeal';
import api from '../../services/api';
import { useParams } from 'react-router-dom';
import MaterialTable from 'material-table';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';
import { useHistory } from 'react-router';

const ConfirmReservationTeacher = () => {
  const history = useHistory();
  const { id_class, id_reservation } = useParams();
  const [students, setStudents] = useState([]);
  const user = JSON.parse(localStorage.getItem('@ifpi/user'));

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


  const apiData = async () => {
    try {
      const resp = await api.get(`/students/class/${id_class}`);
      setStudents(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    apiData();
  }, []);

  const confirmStudents = async (event, rowData) => {
    if(user.permission === 'professor') {
      console.log('caiu aqui professor')
      rowData.map((student) => {
        api.put(`/reservations/class/students/${id_reservation}`, {
          id_student: student._id
        }).then(() => {
          history.push('/minhasReservas');
        })
      })
    }   

    if(user.permission === 'admin') {
      console.log('caiu aqui no admin');
      rowData.map((student) => {
        api.put(`/admin/reservations/class/${id_reservation}`, {
          id_student: student._id
        }).then(() => {
         history.push('/admin/minhasReservas');
        })
      })
    }
  }

  return (
    <>
      <main style={{ flexGrow: 1, padding: '15px' }}>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            minHeight: '64px',
          }}
        />

    <ThemeProvider theme={theme}>
      <MaterialTable
        columns={[
          { title: 'NOME', field: 'name', filtering: false },
          { title: 'Matrícula', field: 'code', filtering: false },
          { title: 'Permisão', field: 'permission', filtering: false },
        ]}
        title={'Selecione os alunos'}
        data={students}
        actions={[
          {
            icon: 'done',
            tooltip: 'Selecionar Alunos',
            onClick: confirmStudents
          },
        ]}
        options={{
          selection: true,
          filtering: true,
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
      </ThemeProvider>
      </main>
      <CountMeal />
    </>
  );
};

export default ConfirmReservationTeacher;