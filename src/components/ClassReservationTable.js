import React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider } from '@material-ui/styles';
import api from '../services/api';
import { createTheme } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

export const ClassReservationTable = ({ classes, apiData, title }) => {
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

  const reservationClass = async (event, rowData) => {
    console.log(rowData._id);
    history.push(`/class/reservation/${rowData._id}`);
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
            icon: 'done',
            tooltip: 'Agendar turma(s)',
            onClick: reservationClass,
          },
        ]}
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
      />
    </ThemeProvider>
  )
};
