import React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider } from '@material-ui/styles';
import api from '../services/api';
import { createTheme } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

export const StudentsTable = ({ students, apiData, title }) => {
  const newStudents = students.map(s => {
    if (s.bloqued === true) {
      return { ...s, bloqueado: 'sim' }
    } else {
      return { ...s, bloqueado: 'não' }
    }
  });

  console.log(newStudents);

  const history = useHistory();

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


  const deleteStudents = async (event, rowData) => {
    return rowData.map(row => {
      api.delete(`/students/${row._id}`).then(() => {
        apiData();
      })
    });
  }

  const removeAuthStudents = async (event, rowData) => {
    return rowData.map(row => {
      api.put(`/students/permission/no/${row._id}`).then(() => {
        apiData();
      })
    });
  }

  const unlockStudents = async (event, rowData) => {
    return rowData.map(row => {
      api.post(`/unlock_student`, { id_student: row._id }).then(() => {
        apiData();
      })
    });
  }

  const lockStudents = async (event, rowData) => {
    return rowData.map(row => {
      api.post(`/lock_student`, { id_student: row._id }).then(() => {
        apiData();
      })
    });
  }

  const authStudents = async (event, rowData) => {
    return rowData.map(row => {
      api.put(`/students/permission/yes/${row._id}`).then(() => {
        apiData();
      })
    });
  }

  const editStudents = async (event, rowData) => {
    console.log(rowData[0]._id);
    const id = rowData[0]._id;
    history.push(`/students/edit/${id}`);
  }

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        title={
          title
        }
        columns={[
          { title: 'NOME', field: 'name', filtering: false },
          { title: 'Matrícula', field: 'code', filtering: false },
          { title: 'Curso', field: 'id_class.course.name', filtering: false },
          { title: 'Turma', field: 'id_class.shift', filtering: false },
          { title: 'Permisão', field: 'permission', filtering: false },
          { title: 'Bloqueado?', field: 'bloqueado', filtering: false }
        ]}
        data={newStudents}
        actions={[
          {
            icon: 'done',
            tooltip: 'Autorizar estudante',
            onClick: authStudents
          },
          {
            icon: 'warning',
            tooltip: 'Remover autorização',
            onClick: removeAuthStudents,
          },
          {
            icon: 'lock',
            tooltip: 'desbloquer aluno',
            onClick: unlockStudents,
          },
          {
            icon: 'block',
            tooltip: 'bloquer aluno',
            onClick: lockStudents,
          },
          {
            icon: 'delete',
            tooltip: 'Deletar estudante',
            onClick: deleteStudents,
          },
          {
            icon: 'edit',
            tooltip: 'Editar estudante',
            onClick: editStudents,
          }
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
  )
};
