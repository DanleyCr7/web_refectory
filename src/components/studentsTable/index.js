import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import api from '../../services/api';
import settingsText from '../../config/settingsText';

const StudentsTable = ({ students, apiData, title }) => {
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

  // const [ selectedRow, setSelectedRow ] = useState({});
  const [columns] = useState([
    { title: 'NOME', field: 'NOME', filtering: false },
    { title: 'Matrícula', field: 'MATRICULA', filtering: false },
    { title: 'Curso', field: 'CURSO', filtering: false },
    { title: 'Turma', field: 'TURMA',filtering: false },
    { title: 'Permisão', field: 'permission', filtering: false  }
  ]);
  
  const doneSelection = async (evnt, students) => {
    console.log('onclick');
    console.log(students);
    const promisesList = students.map(async student => {
      await api.put(`/students/permission/yes/${student._id}`)
    });

    await Promise.all(promisesList).then(resp => {
      console.log('cabou o put');
      apiData();
    });
  };
  const removeAutorization = async (evnt, students) => {
    console.log('onclick');
    console.log(students);
    const promisesList = students.map(async student => {
      await api.put(`/students/permission/no/${student._id}`)
    });

    await Promise.all(promisesList).then(resp => {
      console.log('cabou o put');
      apiData();
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable 
        style={{backgroundColor: '#fff', }}
        title={title}
        localization={settingsText}
        columns={columns}
        data={students}
        actions={[
          { 
          icon: 'done_all', 
          tooltip: 'Autorizar',
          backgroundColor: '#2AB083',
          onClick: doneSelection,
        },
        { 
          icon: 'delete_forever', 
          tooltip: 'Remover autorização',
          backgroundColor: '#2AB083',
          onClick: removeAutorization,
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

export default StudentsTable;