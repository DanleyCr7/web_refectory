import React from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { ThemeProvider } from '@material-ui/styles';
import api from '../services/api';
import { createTheme } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

export const ClassTable = ({ classes, apiData, title }) => {
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


  const deleteClasses = async (event, rowData) => {
    rowData.map(row => {
      api.delete(`/class/${row._id}`).then(() => {
        apiData();
      })
    });
  }


  const editClasses = async (event, rowData) => {
    console.log(rowData[0]._id);
    const id = rowData[0]._id;
    history.push(`/class/edit/${id}`);
  }

  return (
    <ThemeProvider theme={theme}>
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
        actions={[
          {
            icon: 'delete',
            tooltip: 'Deletar turma',
            onClick: deleteClasses,
          },
          {
            icon: 'edit',
            tooltip: 'Editar turma',
            onClick: editClasses,
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
