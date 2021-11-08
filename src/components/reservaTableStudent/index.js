import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import api from '../../services/api';
import settingsText from '../../config/settingsText';

const StudentsTableReserve = ({ students, apiData, title }) => {
  const [state, setState] = useState([]);
  const [open, setOpen] = useState(false);

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

    { title: 'Aluno', field: `id_student.name`, filtering: false },
    { title: 'Matrícula', field: 'id_student.code', filtering: false },
    { title: 'Curso', field: 'id_student.id_class.course.name', filtering: false },
    { title: 'Turma', field: 'id_student.id_class.shift',filtering: false },
    { title: 'Aprovado', field: 'approved',filtering: false },
    { title: 'Confirmação', field: `confirm`,filtering: false },
  ]);
  
  const doneSelection = async (event, rowData) => {
    console.log(rowData)
    rowData.map(row => {
      api.put(`/reservations/student/${row._id}`).then(data => {
        console.log('ok')
        window.location.href="/reserveStudent"
      }).catch(error => {
        console.log(error);
      })
    });
  };

  const disapproveSelection = async (event, rowData) => {
    rowData.map(row => {
      api.put(`/reservations/student/disapprove/${row._id}`).then(data => {
        console.log('ok')
        window.location.href="/reserveStudent"
      }).catch(error => {
        console.log(error);
      })
    });
  }

  const deleteSelection = async (event, rowData) => {
    // /reservations/student/:id
    console.log(rowData)
    rowData.map(row => {
      api.delete(`/reservations/student/${row._id}`).then(data => {
        window.location.href="/reserveStudent"
      }).catch(error => {
        console.log(error);
      })
    });
  }

  const rowAdd = async newData => {
    // try {
    //   await api.post('/menu', newData)
    //   .then(resp => {
    //   }).catch(error=>{
    //     console.log(error)
    //   })
    // } catch(err) {
    //   console.log(err);
    // }
  };
  

  const rowUpdate = async (newData, oldData) => { 
    //  try {
    //    await api.put(`/menu`, {
    //      id: newData._id,
    //      title: newData.title,
    //      description: newData.description,
    //      date: new Date(), 
    //      type: newData.type,
    //    })
    //      .then(resp => {
    //        const data = [...state.data];
    //        data[data.indexOf(oldData)] = newData;
    //        setState({ ...state, data });
    //    })
    //  } catch(err) {
    //    console.log(err);
    //  }
  };
  
  const rowDelete = async (oldData) => {
    //  console.log(oldData._id)
    //  try {
    //    await api.delete(`/menu`, {data: {id: oldData._id}})
    //    .then(resp => {
    //      console.log(resp)
    //      const data = [...state.data];
    //      data.splice(data.indexOf(oldData), 1);
    //      setState({ ...state, data });
    //    })
    //  } catch(err) {
    //    console.log(err);
    //  }
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
            icon: 'done', 
            tooltip: 'Autorizar refeição',
            backgroundColor: '#2AB083',
            onClick: doneSelection,
          },
          { 
            icon: 'cancel', 
            tooltip: 'Desaprovar pedido',
            backgroundColor: '#2AB083',
            onClick: disapproveSelection,
          },
          { 
            icon: 'delete', 
            tooltip: 'Deletar pedido',
            backgroundColor: '#2AB083',
            onClick: deleteSelection,
          }
        ]}
        // editable={{
        //   onRowAdd: newData =>null,
        //   onRowUpdate: rowUpdate,
        //   onRowDelete: rowDelete,
        // }}
        styles={{}}
        localization={settingsText}
        options={{
          selection: true,
          filtering: true,
          actionsColumnIndex: -1,
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

export default StudentsTableReserve;