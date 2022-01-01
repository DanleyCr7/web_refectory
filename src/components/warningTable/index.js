import React, { useState } from 'react'
import MaterialTable from 'material-table'
import api from '../../services/api';
import { createBrowserHistory } from 'history';

import settingsDefaultText from '../../config/settingsText'

export const WarningTable = ({ data, title, apiData }) => {
  const history = createBrowserHistory();

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

  const doneReservation = (event, rowData) => {
    api.put(`/reservations/${rowData._id}`).then(() => {
      apiData();
    }).catch((error) => {
      alert(error);
    });
  }

  const notApprovedReservation = (event, rowData) => {
    api.put(`/reservations/disapprove/${rowData._id}`).then(() => {
      apiData();
    }).catch((error) => {
      alert(error);
    });
  }

  const deleteReservation = (event, rowData) => {
    api.delete(`/reservations/${rowData._id}`).then(() => {
      apiData();
    }).catch((error) => {
      alert(error);
    });
  }

  return (
    <MaterialTable
      title={title}
      columns={state.collumns}
      data={data}
      actions={[
        {
          icon: 'check',
          tooltip: 'Aceitar',
          onClick: doneReservation
        },
        {
          icon: 'delete',
          tooltip: 'Deletar',
          onClick: deleteReservation
        },
        {
          icon: 'warning',
          tooltip: 'Remover autorização',
          onClick: notApprovedReservation,
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
    />
  )
}

export default WarningTable;