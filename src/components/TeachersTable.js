import React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider } from '@material-ui/styles';
import api from '../services/api';
import { createTheme } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

export const TeachersTable = ({ teachers, apiData, title }) => {
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


  const deleteTeachers = async (event, rowData) => {
    rowData.map(row => {
      api.delete(`/teachers/${row._id}`).then(() => {
        apiData();
      })
    });
  }

  const editTeachers = async (event, rowData) => {
    console.log(rowData[0]._id);
    const id = rowData[0]._id;
    history.push(`/teachers/edit/${id}`);
  }

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        title={
          title
        }
        columns={[
          { title: 'NOME', field: 'name', filtering: false },
          { title: 'Email', field: 'email', filtering: false },
          { title: 'Telefone', field: 'phone', filtering: false },
          { title: 'Cidade', field: 'city', filtering: false },
          { title: 'Estado', field: 'state', filtering: false },
          { title: 'Cpf', field: 'cpf', filtering: false },
        ]}
        data={teachers}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Deletar Professor',
            onClick: deleteTeachers,
          },
          {
            icon: 'edit',
            tooltip: 'Editar Professor',
            onClick: editTeachers,
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
