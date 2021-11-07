import React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export const StudentsTableReservationTeacher = ({ students, apiData, title }) => {

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

  console.log(students);

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        columns={[
          { title: 'NOME', field: 'name', filtering: false },
          { title: 'Matrícula', field: 'code', filtering: false },
          { title: 'Curso', field: 'id_class.course.name', filtering: false },
          { title: 'Turma', field: 'id_class.shift', filtering: false },
          { title: 'Permisão', field: 'permission', filtering: false },
        ]}
        title={title}
        data={students}
        actions={[
          // {
          //   icon: 'done',
          //   tooltip: 'Autorizar estudante',
          //   onClick: authStudents
          // },
          // {
          //   icon: 'warning',
          //   tooltip: 'Remover autorização',
          //   onClick: removeAuthStudents,
          // },
          // {
          //   icon: 'delete',
          //   tooltip: 'Deletar estudante',
          //   onClick: deleteStudents,
          // },
          // {
          //   icon: 'edit',
          //   tooltip: 'Editar estudante',
          //   onClick: editStudents,
          // }
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
