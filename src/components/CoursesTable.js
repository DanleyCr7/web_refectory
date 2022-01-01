import React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider } from '@material-ui/styles';
import api from '../services/api';
import { createMuiTheme } from '@material-ui/core';

import { createBrowserHistory } from 'history';

export const CoursesTable = ({ courses, apiData, title }) => {
  const history = createBrowserHistory();

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

  const deleteCourses = async (event, rowData) => {
    rowData.map(row => {
      api.delete(`/courses/${row._id}`).then(() => {
        apiData();
      })
    });
  }

  const editCourses = async (event, rowData) => {
    console.log(rowData[0]._id);
    const id = rowData[0]._id;
    history.push(`/courses/edit/${id}`);
  }

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        title={
          title
        }
        columns={[
          { title: 'NOME', field: 'name', filtering: false },
        ]}
        data={courses}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Deletar curso',
            onClick: deleteCourses,
          },
          {
            icon: 'edit',
            tooltip: 'Editar curso',
            onClick: editCourses,
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
