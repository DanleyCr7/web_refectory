import React, { useState } from 'react'
import api from '../services/api';
import MaterialTable from 'material-table'
import {useHistory} from 'react-router-dom';
import settingsDefaultText from '../config/settingsText'

export const MinhasReservasTable = ({ handlerDialog, data, title, apiData }) => {
  const history = useHistory();

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
               <ul style={{ listStyleType: 'none' }}>
                  { rowData.students.map(student => <li key={student._id}>
                    <p>Nome: {student.name} | Email: {student.email} | Telefone: {student.phone}</p>
                    <hr/>
                  </li> )}
                </ul>
              </div>
            )
          },
        },
      ]}
    />
  )
}

export default MinhasReservasTable;