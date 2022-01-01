import React, { useState } from 'react'
import api from '../services/api';
import MaterialTable from 'material-table'
import { createBrowserHistory } from 'history';
import settingsDefaultText from '../config/settingsText'

export const MinhasReservasTable = ({ handlerDialog, data, title, apiData }) => {
  const history = createBrowserHistory();

  console.log(data)

  const [state, setState] = useState({
    collumns: [
      { title: 'Professor', field: 'teacher_id.name' },
      { title: 'Turma', field: 'class_id.course.name' },
      { title: 'Turno', field: 'class_id.shift' },
      { title: 'Ano', field: 'class_id.year' },
      { title: 'Aprovado?', field: 'approved' },
      { title: 'Data', field: 'data' }
    ],
  })

  const deleteReservation = async (event, rowData) => {
    console.log(rowData);
    api.delete(`/reservations/${rowData._id}`).then(() => {
      apiData();
    })
  }

  const selectStudents = async (event, rowData) => {
    history.push(`/confirmStudentsReservations/${rowData.class_id._id}/${rowData._id}`);
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
}

export default MinhasReservasTable;