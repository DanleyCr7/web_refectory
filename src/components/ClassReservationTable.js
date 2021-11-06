import React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider } from '@material-ui/styles';
import api from '../services/api';
import { createTheme } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

export const ClassReservationTable = ({ reservations, apiData, title }) => {
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
        data={reservations}
        actions={[

        ]}
        options={{
          selection: true,
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
