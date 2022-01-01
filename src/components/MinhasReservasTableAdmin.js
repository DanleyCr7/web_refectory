import React, { useState } from 'react'
import api from '../services/api';
import MaterialTable from 'material-table'
import { createBrowserHistory } from 'history';
import settingsDefaultText from '../config/settingsText';

export const MinhasReservasTableAdmin = ({ handlerDialog, data, title, apiData }) => {
  const history = createBrowserHistory();
  
  console.log(data)

  const [state, setState] = useState({
    collumns: [
      { title: 'Admin', field: 'admin_id.email' },
      { title: 'Turma', field: 'class_id.course.name' },
      { title: 'Turno', field: 'class_id.shift' },
      { title: 'Ano', field: 'class_id.year' },
      { title: 'Aprovado?', field: 'approved' },
      { title: 'Data', field: 'data' }
    ],
  })

  const deleteReservation = async (event, rowData) => {
    rowData.map(row => {
      api.delete(`/admin/reservations/class/${row._id}`).then(() => {
        apiData();
      });
    })
  }

  const selectStudents = async (event, rowData) => {
    const class_id = rowData[0].class_id._id;
    const reservation_id = rowData[0]._id;
    history.push(`/confirmStudentsReservations/${class_id}/${reservation_id}`);
  }

  return (
    <MaterialTable
      title={title}
      columns={state.collumns}
      data={data}
      actions={[
        {
          icon: 'delete',
          tooltip: 'Deletar',
          onClick: deleteReservation
        },
        {
          icon: 'add_circle',
          tooltip: 'Adicionar alunos',
          onClick: selectStudents
        },
      ]}
      localization={settingsDefaultText}
      options={{
        selection: true,
        sorting: false,
        pageSize: 5,
        actionsColumnIndex: -1,
        headerStyle: {
          backgroundColor: '#2FA23B',
          color: '#fff',
          fontSize: '1rem',
          zIndex: 8,
        }
      }}
      detailPanel={[
        {
          tooltip: 'Exibir Alunos',
          render: rowData => {
            return (
              <div
                style={{
                  fontSize: 15,
                  textAlign: 'left',
                  color: 'gray',
                }}
              >
                <table style={{ width: '100%', padding: '10px' }}>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                  </tr>
                  { rowData.students.map(student => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.phone}</td>
                    </tr> 
                  ))}
                </table>
              </div>
            )
          },
        },
      ]}
    />
  )
};