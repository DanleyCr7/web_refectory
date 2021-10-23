import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import api from '../../services/api';
import settingsText from '../../config/settingsText';

const TeachersTable = ({ teachers, apiData, title }) => {
  // const [ selectedRow, setSelectedRow ] = useState({});

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

  const [columns] = useState([
    { title: 'NOME', field: 'name', filtering: false },
    { title: 'Email', field: 'email', filtering: false },
    { title: 'Telefone', field: 'phone', filtering: false },
    { title: 'Cidade', field: 'city', filtering: false },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        style={{ backgroundColor: '#fff', }}
        title={title}
        localization={settingsText}
        columns={columns}
        data={teachers}
        actions={[
          {
            icon: 'delete_forever',
            tooltip: 'Remover autorização',
            backgroundColor: '#2AB083'
          }
        ]}
        onRowClick={((event, rowData) => {
          console.log('teste')
        })}
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
          // rowStyle: rowData => ({
          //   backgroundColor: (selectedRow && selectedRow.tableData.id === rowData.tableData.id) ? '#ddd' : '#fff'
          // }),
        }}
      />
    </ThemeProvider>
  )
};

export default TeachersTable;