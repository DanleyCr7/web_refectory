import React, { useState } from 'react'
import api from '../services/api';
import MaterialTable from 'material-table'

import settingsDefaultText from '../config/settingsText'

export const MinhasReservasTable = ({ handlerDialog, data, title, apiData }) => {
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
          icon: 'visibility',
          tooltip: 'Detalhe',
          onClick: handlerDialog
        }
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
    />
  )
}

export default MinhasReservasTable;